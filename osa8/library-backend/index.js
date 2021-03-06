const { AuthenticationError, UserInputError, ApolloServer, gql } = require('apollo-server')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const MONGODB_URI =
  'mongodb+srv://fullstack:halfstack@cluster0-ostce.mongodb.net/graphql?retryWrites=true'

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String
    id: ID!
    born: Int
    bookCount: Int
    books: [Book]
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
    authorCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allGenres: [String]
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(name: String!, born: Int!): Author
    createUser(username: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
}
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({})
      const  books = await Book.find({}).populate('author')
      return authors.map(a => ( {name: a.name, born: a.born, id: a.id,
        bookCount: books.filter(b => b.author && b.author.name === a.name).length}))
    },
    findAuthor: (root, args) => Author.findOne({ name: args.name }),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }
      if (args.author) {
        const author = await Author.find({ name: args.author })
        console.log('author: ', author)
        result = await Book.find({ author: author._id }).populate('author')
        console.log('result', result)
      }
      if (args.genre) {
        result = await Book.find({ genres: { $in:[args.genre] } }).populate('author')
        console.log('result:', result)
      }
      return result
    },
    allGenres: async () => {
      let genres = []
      const books = await Book.find({})
      books.map(b => b.genres.forEach(g => {
        genres.push(g)
      }))
      return [...new Set(genres)]
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not permitted')
      }
      if (!args.title) {
        throw new UserInputError('Missing title data')
      }
      if (args.title.length < 2) {
        throw new UserInputError('Title is too short')
      }
      let author = await Author.findOne({name: args.author})
      if (!author) {
        author = new Author({name: args.author, born: null})
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      console.log('authorrr ', author)
      const book = new Book({...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      console.log('book ', book)
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book

    },

    editAuthor: async (root, args) => {
      if (!args.name) {
        throw new UserInputError('Missing name')
      }
      if (args.name.length < 4) {
        throw new UserInputError('Name input is too short')
      }
      const author = await Author.findOne({ name: args.name })
      if ( !author) {
        throw new UserInputError('Author not found')
      }
      author.born = args.born
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre || null  })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate(
        'friends'
      )
      return { currentUser }
    }
  },
})


server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})

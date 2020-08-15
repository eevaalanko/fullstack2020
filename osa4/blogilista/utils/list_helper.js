const _ = require('lodash')

const dummy = (blogs) => {
  console.log('blogs: ', blogs)
  return 1
}

const totalLikes = (blogs) => {
  console.log('blogs: ', blogs)
  return blogs.length === 0
    ? 0
    : blogs.reduce((amount, blog) => amount + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  console.log('blogs: ', blogs)
  return blogs.length === 0
    ? null
    : blogs.reduce((prev, current) =>
      +prev.likes > +current.likes ? prev : current
    )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const authors = _.groupBy(blogs, 'author')
  const max = _.values(authors).reduce(function (a, b) {
    return a.length > b.length ? a : b
  })
  const author = Object.keys(authors).find((key) => authors[key] === max)
  return { author, blogs: max.length }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}

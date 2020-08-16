const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'koirablogi',
    author: 'snoopy',
    url: 'http://whoff.com',
    likes: 101,
  },
  {
    title: 'sota ja rauha',
    author: 'tolstoi',
    url: 'http://jokublogi.com',
    likes: 1,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

test('the first blog is about dogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe('koirablogi')
})

test('blog contains prop id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})

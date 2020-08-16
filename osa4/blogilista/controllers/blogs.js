const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  console.log('operation returned the following blogs', blogs)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let blog = {}
  let requ = request.body

  requ.likes === undefined
    ? (blog = new Blog({ ...request.body, likes: 0 }))
    : (blog = new Blog(request.body))

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    console.log('exception: ', exception)
  }
})

module.exports = blogsRouter

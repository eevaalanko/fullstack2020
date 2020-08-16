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

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
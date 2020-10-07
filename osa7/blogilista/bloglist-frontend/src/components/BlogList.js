import Togglable from './Togglable'
import BlogForm from './BlogForm'
import _ from 'lodash'
import Blog from './Blog'
import React from 'react'

const BlogList = ({blogs, addLike, remove}) => (
  <div>
    <Togglable buttonLabel="new blog">
      <h2>create new</h2>
      <BlogForm />
    </Togglable>
    <br />
    {_.sortBy(blogs, 'likes')
      .reverse()
      .map((blog) => (
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={remove} />
      ))}
  </div>
)



export default BlogList
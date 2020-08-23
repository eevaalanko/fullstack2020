import React from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}
const Blog = ({ blog, addLike, removeBlog }) => (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <Togglable buttonLabel="view" closeButtonLabel="hide">
      <p>link: {blog.url}</p>
      <p>likes: {blog.likes}<button onClick={()=> addLike(blog.id)}>like</button></p>
      <p>user: {blog.user.name}</p>
      <button onClick={()=> removeBlog(blog.id)}>remove</button>
    </Togglable>
  </div>
)

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({name: PropTypes.string})
  }).isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog

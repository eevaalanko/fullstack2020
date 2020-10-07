import React, { useEffect } from 'react'
import _ from 'lodash'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { logout, setUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  const addLike = (id) => {
    dispatch(likeBlog(id))
  }

  const remove = (id) => {
    dispatch(removeBlog(id))
  }

  const logoutUser = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={logoutUser}>logout</button>
          </p>
          <Togglable buttonLabel="new blog">
            <h2>create new</h2>
            <BlogForm />
          </Togglable>
          <br />
          {_.sortBy(blogs, 'likes')
            .reverse()
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                removeBlog={remove}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App

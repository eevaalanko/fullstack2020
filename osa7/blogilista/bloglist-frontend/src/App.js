import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { addErrorMessage } from './reducers/notificationReducer'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import {initializeBlogs, likeBlog, removeBlog} from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  console.log('blogs : ', blogs)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    } catch (exception) {
      addErrorMessage('wrong credentials')
    }
  }

  const addLike = (id) => {
    dispatch(likeBlog(id))
  }

  const remove = (id) => {
    dispatch(removeBlog(id))
  }

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </Togglable>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
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

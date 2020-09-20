import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useDispatch, } from 'react-redux'
import {addErrorMessage, addMessage} from './reducers/notificationReducer'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newLink, setNewLink] = useState('')
  const [newLikes, setNewLikes] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  console.log('blogs : ', blogs)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newLink,
      likes: newLikes,
    }
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat({ ...returnedBlog, user }))
        dispatch(addMessage(`a new blog ${newTitle} by ${newAuthor} added`), 3000)
        setNewTitle('')
        setNewAuthor('')
        setNewLink('')
        setNewLikes(0)
      })
      .catch(() => {
        dispatch(addErrorMessage('validation failed', 3000))
      })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleLinkChange = (event) => {
    setNewLink(event.target.value)
  }
  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }

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
    const blog = blogs.find((b) => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
      })
      .catch(() => {
        addErrorMessage(`Blog '${blog.title}' was already removed from server`, 3000)
      })
  }

  const removeBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (window.confirm(`Delete ${blog.title}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== blog.id))
          addMessage(`Deleted ${blog.title}`)
        })
        .catch(() => {
          addErrorMessage(
            `Information of ${blog.title} has already been removed from server`
          )
        })
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification  />
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
            <BlogForm
              addBlog={addBlog}
              newTitle={newTitle}
              handleTitleChange={handleTitleChange}
              newAuthor={newAuthor}
              handleAuthorChange={handleAuthorChange}
              newLink={newLink}
              handleLinkChange={handleLinkChange}
              newLikes={newLikes}
              handleLikesChange={handleLikesChange}
            />
          </Togglable>
          <br />
          {_.sortBy(blogs, 'likes')
            .reverse()
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                removeBlog={removeBlog}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App

import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { logout, setUser } from './reducers/loginReducer'
import BlogList from './components/BlogList'
import UserList from './components/UserList'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
    </div>
  )
}

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.loggedInUser)

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
      <Menu/>

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
          <Switch>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/">
              <BlogList blogs={blogs} addLike={addLike} remove={remove} />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  )
}

export default App

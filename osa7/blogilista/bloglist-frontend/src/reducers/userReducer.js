import loginService from '../services/login'
import blogService from '../services/blogs'
import { addErrorMessage } from './notificationReducer'

export const setUser = () => {
  return async (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch({
          type: 'SET_USER',
          data: user,
        })
        blogService.setToken(user.token)
      }
    } catch (exception) {
      addErrorMessage('not logged in')
    }
  }
}

export const login = (user) => {
  return async (dispatch) => {
    try {
      const usr = await loginService.login(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(usr))
      dispatch(setUser())
    } catch (exception) {
      addErrorMessage('wrong credentials')
    }
  }
}

export const logout = () => {
  window.localStorage.clear()
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER',
      data: null,
    })
  }
}

const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export default userReducer

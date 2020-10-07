import blogService from '../services/blogs'
import { addMessage, addErrorMessage } from './notificationReducer'

export const createBlog = (content) => {
  console.log('content: ', content)
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
      dispatch(
        addMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      )
    } catch (e) {
      dispatch(addErrorMessage('validation failed'))
    }
  }
}

export const likeBlog = (blog) => {
  console.log('liked blog iiis   ', blog)
  const changedBlog = { ...blog, likes: blog.likes + 1 }
  return async (dispatch) => {
    try {
      const newBlog = await blogService.update(blog.id, changedBlog)
      dispatch({
        type: 'ADD_LIKE',
        data: newBlog,
      })
    } catch (e) {
      addErrorMessage(`Failed to update ${blog.title}`)
    }
  }
}

export const removeBlog = (blog) => {
  console.log('poistettava id ooon   ', blog)
  return async (dispatch) => {
    try {
      const removedBlog = await blogService.remove(blog.id)

      console.log('removed blog: ', removedBlog)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog.id,
      })
      dispatch(addMessage(`Deleted ${blog.title}`))
    } catch (e) {
      console.log('error: ', e)
      dispatch(addErrorMessage(`Failed to delete ${blog.title}`))
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_LIKE': {
    return state.map((el) => (el.id === action.data.id ? action.data : el))
  }
  case 'REMOVE_BLOG': {
    console.log('state', state)
    return state.filter((el) => el.id !== action.data)
  }

  default:
    return state
  }
}

export default blogReducer

let timeoutID = null

export const addMessage = (notification, timeOut= 3000) => {
  window.clearTimeout(timeoutID)
  return async (dispatch) => {
    dispatch({
      type: 'ADD_MESSAGE',
      data: notification,
    })
    await new Promise((resolve) => {
      timeoutID = setTimeout(() => {
        dispatch(clearMessage())
        resolve()
      }, timeOut)
    })
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE',
  }
}

export const addErrorMessage = (notification, timeOut = 3000) => {
  window.clearTimeout(timeoutID)
  return async (dispatch) => {
    dispatch({
      type: 'ADD_ERROR_MESSAGE',
      data: notification,
    })
    await new Promise((resolve) => {
      timeoutID = setTimeout(() => {
        dispatch(clearErrorMessage())
        resolve()
      }, timeOut)
    })
  }
}

export const clearErrorMessage = () => {
  return {
    type: 'CLEAR_ERROR_MESSAGE',
  }
}

const initialState = { message: '', errorMessage: '' }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_MESSAGE':
    return { ...state, message: action.data }
  case 'CLEAR_MESSAGE':
    return { ...state, message: '' }
  case 'ADD_ERROR_MESSAGE':
    return { ...state, errorMessage: action.data }
  case 'CLEAR_ERROR_MESSAGE':
    return { ...state, errorMessage: '' }
  default:
    return state
  }
}

export default notificationReducer

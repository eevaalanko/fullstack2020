import userService from '../services/users'

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data

  default:
    return state
  }
}

export default userReducer

const initialState = []


export const addNotification = notification => {
  return {
    type: "ADD_NOTIFICATION",
    notification,
  }
}

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  }
}


const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case "ADD_NOTIFICATION":
    return [action.notification];
  case "CLEAR_NOTIFICATION":
    return initialState;
  default:
    return state
  }
}

export default notificationReducer
const initialState = ["joku notifikaatio"]


export const notificationChange = notification => {
  return {
    type: "ADD_NOTIFICATION",
    notification,
  }
}


const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case "ADD_NOTIFICATION":
    return [...state, action.data];
  case "CLEAR_NOTIFICATION":
    return initialState;
  default:
    return state
  }
}

export default notificationReducer
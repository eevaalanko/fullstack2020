import anecdoteService from "../services/anecdotes";

const initialState = [];

export const addNotification1 = (notification) => {
  return {
    type: "ADD_NOTIFICATION",
    notification,
  };
};

export const addNotification = (notification, timeOut) => {
  return async (dispatch) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      data: notification,
    });
    await new Promise((resolve) =>
      setTimeout(() => {
        console.log("timeout");
        dispatch(clearNotification());
        resolve();
      }, timeOut)
    );
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [action.data];
    case "CLEAR_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;

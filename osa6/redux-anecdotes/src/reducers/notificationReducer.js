let timeoutID = null;
export const addNotification = (notification, timeOut) => {
  window.clearTimeout(timeoutID);
  return async (dispatch) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      data: notification,
    });
    await new Promise((resolve) => {
      timeoutID = setTimeout(() => {
        dispatch(clearNotification());
        resolve();
      }, timeOut);
    });
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

const initialState = { notification: "" };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return { ...state, notification: action.data };
    case "CLEAR_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;

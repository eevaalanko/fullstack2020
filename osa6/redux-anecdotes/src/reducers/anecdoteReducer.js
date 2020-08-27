import anecdoteService from "../services/anecdotes";

export const createAnecdote1 = (data) => {
  return {
    type: "NEW_ANECDOTE",
    data,
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const voteAnecdote = (content) => {
  console.log("content ooon   ", content);
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(content.id, content);
    dispatch({
      type: "ADD_VOTE",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

const initialState = [];

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    case "ADD_VOTE": {
      return state.map((el) =>
        el.id === action.data.id
          ? { ...action.data, votes: action.data.votes + 1 }
          : el
      );
    }

    default:
      return state;
  }
};

export default anecdoteReducer;

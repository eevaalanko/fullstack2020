import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import {
  addNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNew = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(createAnecdote(content));
    dispatch(addNotification(`you added '${content}'`, 3000));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

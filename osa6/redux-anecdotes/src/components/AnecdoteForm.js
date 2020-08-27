import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import {
  addNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNew = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(addNotification(`you added '${content}'`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
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
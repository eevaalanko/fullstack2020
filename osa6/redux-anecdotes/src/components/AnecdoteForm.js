import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { addNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addNew = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    props.createAnecdote(content);
    props.addNotification(`you added '${content}'`, 3000);
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

const mapDispatchToProps = {
  createAnecdote,
  addNotification,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;

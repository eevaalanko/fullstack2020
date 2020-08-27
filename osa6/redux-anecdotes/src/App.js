import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {createAnecdote, voteAnecdote} from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);
  const addNew = (event) => {
    event.preventDefault();
    const content = event.target.content.value
    dispatch(createAnecdote(content));
  };

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App;

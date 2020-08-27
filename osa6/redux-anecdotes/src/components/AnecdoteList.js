import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  addNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = _.sortBy(
    useSelector((state) => state.anecdotes),
    "votes"
  ).reverse();

  const filter = useSelector((state) => state.filter);

  console.log("filter ", filter);

  const filteredAnecdotes =
    filter.length > 0
      ? anecdotes.filter((a) => a.content.includes(filter))
      : anecdotes;

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(addNotification(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {useDispatch, useSelector} from 'react-redux'
import _ from 'lodash'
import {addNotification, clearNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = _.sortBy(
    useSelector((state) => state.anecdotes),
    "votes"
  ).reverse();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(addNotification(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
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

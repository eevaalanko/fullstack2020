import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {useDispatch, useSelector} from 'react-redux'
import _ from 'lodash'

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = _.sortBy(
    useSelector((state) => state),
    "votes"
  ).reverse();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

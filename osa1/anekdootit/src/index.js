import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const selectAnecdote = (anecdotes) =>
  Math.floor(Math.random() * anecdotes.length);

const updatePoints = (points, index) => {
  const copy = [...points];
  copy[index] += 1;
  return copy;
};

const App = ({ anecdotes }) => {
  const pointsArray = Array.apply(null, new Array(anecdotes.length)).map(
    Number.prototype.valueOf,
    0
  );
  const [selected, setSelected] = useState(selectAnecdote(anecdotes));
  const [points, setPoints] = useState(pointsArray);
  const maxPoints = Math.max(...points);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} points</p>
      <Button
        handleClick={() => setPoints(updatePoints(points, selected))}
        text="vote"
      />
      <Button
        handleClick={() => setSelected(selectAnecdote(anecdotes))}
        text="next anecdote"
      />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[points.indexOf(maxPoints)]}</p>
      <p>Has {maxPoints} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));

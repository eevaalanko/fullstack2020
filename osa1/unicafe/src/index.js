import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, statistic }) => (
  <tr>
    <td>{text}</td>
    <td>{statistic}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all > 0 ? (good - bad) / all : 0;
  const positive = all > 0 ? (good / all) * 100 : 0;
  return (
    <div>
      <h1>Statistics</h1>
      {all > 0 ? (
        <div>
          <table>
            <tbody>
              <StatisticLine text="good" statistic={good} />
              <StatisticLine text="neutral" statistic={neutral} />
              <StatisticLine text="bad" statistic={bad} />
              <StatisticLine text="all" statistic={all} />
              <StatisticLine text="average" statistic={average} />
              <StatisticLine text="positive" statistic={positive} />
            </tbody>
          </table>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

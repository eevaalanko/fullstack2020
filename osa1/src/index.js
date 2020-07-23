import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ part1, part2, part3 }) => (
  <div>
    <Part part={part1} />
    <Part part={part2} />
    <Part part={part3} />
  </div>
);

const Total = ({ text, content }) => (
  <p>
    {text} {content.reduce((acc, curr) => acc + curr.exercises, 0)}
  </p>
);

const App = () => {
  const course = "Half Stack application development";
  const content = [
    {
      text: "Fundamentals of React",
      exercises: 10,
    },
    {
      text: "Using props to pass data",
      exercises: 7,
    },
    {
      text: "State of a component",
      exercises: 14,
    },
  ];
  const totalText = "Number of exercises";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  const props = { part1, part2, part3 };

  return (
    <div>
      <Header course={course} />
      <Content {...props} />
      <Total text={totalText} content={content} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ content }) => (
  <div>
    {content.map((content) => (
      <Part {...content} key={content.id} />
    ))}
  </div>
);
const Total = ({ text, content }) => (
  <p>
    {text} {content.reduce((acc, curr) => acc + curr.exercises, 0)}
  </p>
);

const Course = ({ name, parts, totalText }) => (
  <div>
    <Header course={name} />
    <Content content={parts} />
    <Total text={totalText} content={parts} />
  </div>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        id: 1,
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        id: 2,
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        id: 3,
        name: "State of a component",
        exercises: 14,
      },
    ],
    totalText: "Number of exercises",
  };

  return (
    <div>
      <Course {...course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

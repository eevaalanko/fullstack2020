import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part }) => (
  <p>
    {part.text} {part.exercises}
  </p>
);

const Content = ({ content }) => (
  <div>
    <Part part={content[0]} />
    <Part part={content[1]} />
    <Part part={content[2]} />
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

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total text={totalText} content={content} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

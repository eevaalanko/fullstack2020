import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ content }) => (
  <div>
    {content.map((content) => (
      <p>
        {content.name} {content.exercises}
      </p>
    ))}
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
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
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

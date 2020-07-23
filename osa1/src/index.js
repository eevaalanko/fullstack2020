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
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ],
    totalText: "Number of exercises",
  };

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total text={course.totalText} content={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

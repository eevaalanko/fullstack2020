import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ content }) => (
  <div>
    <p>
      {content[0].text} {content[0].exercises}
    </p>
    <p>
      {content[1].text} {content[1].exercises}
    </p>
    <p>
      {content[2].text} {content[2].exercises}
    </p>
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
      <Header cource={course} />
      <Content content={content} />
      <Total text={totalText} content={content} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

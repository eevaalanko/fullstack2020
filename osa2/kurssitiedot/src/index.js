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
const Total = ({ text1, text2, content }) => (
  <p>
    <b>
      {text1} {content.reduce((acc, curr) => acc + curr.exercises, 0)} {text2}
    </b>
  </p>
);

const Course = ({ name, parts, totalText1, totalText2 }) => (
  <div>
    <Header course={name} />
    <Content content={parts} />
    <Total text1={totalText1} text2={totalText2} content={parts} />
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
      {
        id: 4,
        name: "Redux",
        exercises: 11,
      },
    ],
    totalText1: "total of",
    totalText2: "exercises",
  };

  return (
    <div>
      <Course {...course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

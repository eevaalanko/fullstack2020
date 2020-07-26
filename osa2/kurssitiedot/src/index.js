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
const Total = ({ content }) => (
  <p>
    <b>
      total of {content.reduce((acc, curr) => acc + curr.exercises, 0)}{" "}
      exercises
    </b>
  </p>
);

const Course = ({ name, parts }) => (
  <div>
    <Header course={name} />
    <Content content={parts} />
    <Total content={parts} />
  </div>
);

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map((course) => (
        <Course {...course} key={course.id} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
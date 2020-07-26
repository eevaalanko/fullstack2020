import React from "react";

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

export default Course;

import React from "react";
import { CourseParts } from "../types";

const Total: React.FC<CourseParts> = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total;

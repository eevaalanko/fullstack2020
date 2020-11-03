import React from "react";

interface CourseProps {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courseParts: Array<CourseProps>;
}

const Content: React.FC<ContentProps> = ({ courseParts }) => (
  <div>
    {courseParts.map((c) => (
      <p key={c.name}>
        {c.name} {c.exerciseCount}
      </p>
    ))}
  </div>
);

export default Content;

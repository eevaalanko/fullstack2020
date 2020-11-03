import React from "react";
import Part from "./Part";
import { CourseParts } from "../types";

const Content: React.FC<CourseParts> = ({ parts }) => (
    <Part parts={parts}/>
);

export default Content;

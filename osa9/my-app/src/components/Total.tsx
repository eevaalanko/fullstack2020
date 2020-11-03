import React from "react";
import {ContentProps} from "./Content";

const Total: React.FC<ContentProps> = ({ courseParts }) =><p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
</p>

export default Total
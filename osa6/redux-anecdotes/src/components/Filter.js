import React from "react";
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const getFilter = (event) => {
    const filter = event.target.value;
    dispatch(filterChange(filter));
  };
  return (
    <div>
      filter shown with
      <input name="filter" onChange={getFilter} />
    </div>
  );
};

export default Filter;

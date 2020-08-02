import React from "react";

const Filter = ({ handleChange, newFilter }) => (
  <div>
    filter shown with
    <input
      type="text"
      name="filter"
      onChange={handleChange}
      value={newFilter}
    />
  </div>
);

export default Filter;

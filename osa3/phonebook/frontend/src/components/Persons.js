import React from "react";

const Persons = ({ persons, removePerson }) => (
  <div>
    <h2>Numbers</h2>
    {persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}{" "}
        <button type="text" onClick={() => removePerson(person)}>
          delete
        </button>
      </p>
    ))}
  </div>
);

export default Persons;

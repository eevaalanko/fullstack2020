import React, { useState } from "react";
import ReactDOM from "react-dom";

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

const PersonForm = ({
  addPerson,
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
}) => (
  <div>
    <h2>Add a new</h2>

    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={newName}
        />
        <div>
          number:
          <input
            type="text"
            name="number"
            onChange={handleNumberChange}
            value={newNumber}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
);

const Persons = ({ persons }) => (
  <div>
    <h2>Numbers</h2>
    {persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123123" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.map((person) => person.name).includes(newName);

    if (alreadyAdded) {
      alert(`${newName} is already added to phone book`);
    } else if (newName.length > 1) {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons =
    newFilter.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h1>Phone book</h1>
      <Filter handleChange={handleFilterChange} newFilter={newFilter} />
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));

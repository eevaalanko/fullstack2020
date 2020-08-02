import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import personService from "./personService";

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

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const getPersons = () => {
    personService.getAll().then((response) => setPersons(response));
  };

  useEffect(() => {
    getPersons();
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const alreadyAdded = persons.filter((person) => person.name === newName);

    if (alreadyAdded.length > 0) {
      if (
        window.confirm(
          `${newName} is already added to phone book, replace the old number with new one`
        )
      ) {
        personService
          .update(alreadyAdded[0].id, { id: alreadyAdded.id, ...personObject })
          .then((response) => getPersons());
      }
    } else if (newName.length > 1) {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then((response) =>
          setPersons(persons.filter((p) => p.id !== person.id))
        );
    }
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
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));

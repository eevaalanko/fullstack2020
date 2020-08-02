import React, { useState, useEffect } from "react";
import Notification from "./Notification";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";
import personService from "./../personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState(null);

  const getPersons = () => {
    personService.getAll().then((response) => setPersons(response));
  };

  useEffect(() => {
    getPersons();
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  const showInfoMessage = (message) => {
    setInfoMessage(message);
    setTimeout(() => {
      setInfoMessage(null);
    }, 5000);
  };

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
        showInfoMessage(`Updated ${newName}`);
      }
    } else if (newName.length > 1) {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response));
        showInfoMessage(`Added ${newName}`);
        setTimeout(() => {
          setInfoMessage(null);
        }, 5000);
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
      showInfoMessage(`Deleted ${person.name}`);
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
      <Notification message={infoMessage} />
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

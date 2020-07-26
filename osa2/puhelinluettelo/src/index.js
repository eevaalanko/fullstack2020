import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.map((person) => person.name).includes(newName);

    if (alreadyAdded) {
      alert(`${newName} is already added to phone book`);
    } else if (newName.length > 1) {
      const personObject = {
        name: newName,
      };
      setPersons(persons.concat(personObject));
    }
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            type="text"
            name="name"
            onChange={handleNameChange}
            value={newName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));

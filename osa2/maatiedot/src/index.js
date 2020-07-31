import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

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

const CountryForm = ({ addCountry, handleNameChange, newName }) => (
  <form>
    <div>
      find countries
      <input
        type="text"
        name="name"
        onChange={handleNameChange}
        value={newName}
      />
    </div>
  </form>
);

const Countries = ({ countries }) => (
  <div>
    {countries.map((country) => (
      <p key={country.name}>{country.name}</p>
    ))}
  </div>
);

const App = () => {
  const [newName, setNewName] = useState("");

  const [countries, setCountries] = useState([]);

  const filteredCountries = (newName, countries) =>
    newName.length > 0
      ? countries.filter((country) =>
          country.name.toLowerCase().includes(newName.toLowerCase())
        )
      : [];

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("maatiedot", response);
      console.log(filteredCountries(newName, response.data));
      setCountries(filteredCountries(newName, response.data));
    });
  }, [newName]);

  const handleNameChange = (event) => setNewName(event.target.value);

  return (
    <div>
      <CountryForm handleNameChange={handleNameChange} newName={newName} />
      {countries.length > 10 && <p>Too many matches, try another filter</p>}
      {countries.length > 1 && countries.length < 10 && (
        <Countries countries={countries} />
      )}
      {countries.length === 1 && (
        <div>
          <h2>{countries[0].name}</h2>
          <p>capital {countries[0].capital}</p>
          <p>population {countries[0].population}</p>
          <h4>Languages</h4>
          <ul>
            {countries[0].languages.map((lang) => (
              <li>{lang.name}</li>
            ))}
          </ul>
          <img
            alt="flag"
            src={countries[0].flag}
            width="20%"
            height="20%"
            border="1"
          />
        </div>
      )}
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));

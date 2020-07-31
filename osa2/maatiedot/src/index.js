import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const CountryForm = ({ handleNameChange, newName }) => (
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

const Country = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h4>Languages</h4>
    <ul>
      {country.languages.map((lang) => (
        <li>{lang.name}</li>
      ))}
    </ul>
    <img alt="flag" src={country.flag} width="20%" height="20%" border="1" />
  </div>
);

const Countries = ({ countries, setVisible }) => (
  <div>
    {countries.map((country) => (
      <div>
        {country.isVisible ? (
          <Country country={country} />
        ) : (
          <p key={country.name}>
            {country.name}
            <button onClick={() => setVisible(country)}>show</button>
          </p>
        )}
      </div>
    ))}
  </div>
);

const App = () => {
  const [newName, setNewName] = useState("");
  const [countries, setCountries] = useState([]);

  const addVisibility = (country) => {
    const visibleCountry = {
      ...country,
      isVisible: true,
    };
    const newCountries = countries.map((c) =>
      c.name === country.name ? visibleCountry : c
    );
    setCountries(newCountries);
  };

  const filteredCountries = (newName, countries) =>
    newName.length > 0
      ? countries.filter((country) =>
          country.name.toLowerCase().includes(newName.toLowerCase())
        )
      : [];

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(filteredCountries(newName, response.data));
    });
  }, [newName]);

  const handleNameChange = (event) => setNewName(event.target.value);

  return (
    <div>
      <CountryForm handleNameChange={handleNameChange} newName={newName} />
      {countries.length > 10 && <p>Too many matches, try another filter</p>}
      {countries.length > 1 && countries.length < 10 && (
        <Countries countries={countries} setVisible={addVisibility} />
      )}
      {countries.length === 1 && <Country country={countries[0]} />}
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));

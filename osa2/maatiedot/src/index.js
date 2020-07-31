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
    <h4>Spoken languages</h4>
    <ul>
      {country.languages.map((lang) => (
        <li>{lang.name}</li>
      ))}
    </ul>
    <img alt="flag" src={country.flag} width="20%" height="20%" border="1" />
    <h4>Weather in {country.capital}</h4>
    <p>
      <b>temperature:</b>
      {country.weather.temperature} Celcius
    </p>
    <img
      alt="weather"
      src={country.weather.weather_icons[0]}
      width="10%"
      height="10%"
      border="1"
    />
    <p>
      <b>wind:</b>
      {country.weather.wind_speed} mph direction {country.weather.wind_dir}
    </p>
  </div>
);

const Countries = ({ countries, setSelectedCountry }) => (
  <div>
    {countries.map((country) => (
      <p key={country.name}>
        {country.name}
        <button onClick={() => setSelectedCountry(country)}>show</button>
      </p>
    ))}
  </div>
);

const App = () => {
  const [newName, setNewName] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;

  const setCountryWithWeather = (country) => {
    axios
      .get(
        "http://api.weatherstack.com/current?access_key=" +
          api_key +
          "&query=" +
          country.capital
      )
      .then((response) => {
        setSelectedCountry({ ...country, weather: response.data.current });
      });
  };

  const filteredCountries = (newName, countries) =>
    newName.length > 0
      ? countries.filter((country) =>
          country.name.toLowerCase().includes(newName.toLowerCase())
        )
      : [];

  useEffect(() => {
    setSelectedCountry(null);
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      const filtered = filteredCountries(newName, response.data);
      if (filtered.length === 1) {
        setCountryWithWeather(filtered[0]);
      }
      setCountries(filtered);
    });
  }, [newName]);

  const handleNameChange = (event) => setNewName(event.target.value);

  return (
    <div>
      <CountryForm handleNameChange={handleNameChange} newName={newName} />

      {!selectedCountry && countries.length > 10 && (
        <p>Too many matches, try another filter</p>
      )}
      {!selectedCountry && countries.length > 1 && countries.length < 10 && (
        <Countries
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setCountryWithWeather}
        />
      )}
      {selectedCountry && <Country country={selectedCountry} />}
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));

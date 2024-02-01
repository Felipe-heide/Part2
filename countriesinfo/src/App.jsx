import axios from "axios";
import { useEffect, useState } from "react";
import Information from "./components/Information";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        const countryNames = response.data.map((country) => country.name);
        setCountries(countryNames);
        setCountriesToShow(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const filter = e.target.value.toLowerCase();
    const filteredCountries = countries.filter((country) =>
      country.toLowerCase().startsWith(filter)
    );
    setCountriesToShow(filteredCountries);
  };

  const handleShowButtonClick = (country) => {
    setCountriesToShow([country]);
  };

  return (
    <div className="App">
      <h1>COUNTRY INFORMATION</h1>
      <div>
        find country <input onChange={handleChange} />
      </div>
      <div>
        <ul>
        {countriesToShow.length >= 2 && countriesToShow.length <= 10
    ? countriesToShow.map((country) => (
        <li key={country}>
          {country} <button onClick={() => handleShowButtonClick(country)}>show</button>
        </li>
      ))
    : countriesToShow.length === 1
    ? <Information country={countriesToShow[0]} />
    : countriesToShow.length === 0
    ? <p>No countries found</p>
    : <p>Too many matches, specify another filter</p>}
</ul>
      </div>
    </div>
  );
};

export default App;


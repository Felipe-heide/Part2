import { useEffect, useState } from 'react';
import axios from 'axios';

const Information = ({ country: selectedCountry }) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryResponse = await axios.get(`https://restcountries.com/v2/name/${selectedCountry}`);
        const info = countryResponse.data[0];
        setCountryInfo(info);

        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${info.capital}`);
        console.log(weatherResponse.data);
        setWeather(weatherResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCountry, apiKey]);

  return (
    <div>
      <div>
        <h1>{selectedCountry}</h1>
        {countryInfo ? (
          <>
            <p>Capital: {countryInfo.capital}</p>
            <p>Area: {countryInfo.area}</p>
            <b>Languages</b>
            <ul>
              {countryInfo.languages.map((language) => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ul>
            <img src={countryInfo.flags.png} alt={`${selectedCountry} flag`} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h1>Weather in {selectedCountry}</h1>
        {weather ? (
          <>
            <p>Temperature {weather.main.temp} K</p>
            <p>Weather {weather.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
            <p>Wind {weather.wind.speed} m/s</p>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default Information;

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useEffect, useState } from 'react';

import searchIcon from "./assets/search.jpeg";
import clearIcon from "./assets/sun.jpg";
import cloudIcon from "./assets/cloudysun.jpg";
import drizzleIcon from "./assets/drizzleIcon.jpeg";
import rainIcon from "./assets/rainicon.jpeg";
import windIcon from "./assets/windicon.jpeg";
import snowIcon from "./assets/snowicon.jpeg";
import humidityIcon from "./assets/humidity.jpeg";
import ErrorMessage from './ErrorMessage';
import NetworkConnection from './NetworkConnection';
import GetTime from './GetTime';

const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt='weather' />
      </div>
      <div className='temp'>{temp}°C</div>
      <div className='location'>{city}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidityIcon} alt="humidity" className='icon' />
          <div className='data'>
            <div className='humidityp'>{humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={windIcon} alt="wind" className='icon' />
          <div className='data'>
            <div className='humidityp'>{wind} km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async () => {
    let api_key = "e1d9696c344d4846d0e9b234b18eb673";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLog(data.coord.lon);
      setLat(data.coord.lat);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setLoading(true);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  return (
    <NetworkConnection>
      {cityNotFound ? (
        <ErrorMessage />
      ) : (
        <div className='container'>
          <div className='input-container'>
            <input
              type="text"
              className='cityInput'
              placeholder='Search City'
              onChange={handleCity}
              value={text}
              onKeyDown={handleKeyDown}
            />
            <div className='search-icon' onClick={search}>
              <img src={searchIcon} alt='search' className='img' />
            </div>
          </div>
          <GetTime/>
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            log={log}
            humidity={humidity}
            wind={wind}
          />
          
          <button className='changemode mb-2' onClick={toggleDarkMode}>
            {darkMode ? (
              <span className="btn btn-light mb-5 text-center">Switch to Light Mode</span>
            ) : (
              <span className="btn btn-dark mb-4 text-center">Switch to Dark Mode</span>
            )}
          </button>
          <p className='copy'>
            Designed by <span>Gokul</span>
          </p>
        </div>
      )}
    </NetworkConnection>
  );
}

export default App;

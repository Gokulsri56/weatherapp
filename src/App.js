import './App.css';
import { useEffect, useState } from 'react';

import searchIcon from "./assets/search.jpeg"
import clearIcon from "./assets/sun.jpg"
import cloudIcon from "./assets/cloudysun.jpg"
import drizzleIcon from "./assets/drizzleIcon.jpeg"
import rainIcon from "./assets/rainicon.jpeg"
import windIcon from "./assets/windicon.jpeg"
import snowIcon from "./assets/snowicon.jpeg"
import humidityIcon from "./assets/humidity.jpeg"

const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(
    <>
    <div className='image'>
      <img src={icon} alt='image'/>
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
        <img src={humidityIcon} alt="hum"
        className='icon'/>
        <div className='data'>
          <div className='humidityp'>{humidity}%</div>
          <div className='text'>Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img src={windIcon} alt="wind"
        className='icon'/>
        <div className='data'>
          <div className='humidityp'>{wind} km/h</div>
          <div className='text'>Wind Speed</div>
        </div>
      </div>
    </div>

    </>
  )
}

// const search=async()=>{
//   let api_key="e1d9696c344d4846d0e9b234b18eb673"
//   let url=`https://api.openweathermap.org/data/2.5/weather?q=vellore&appid=&{api_key}&units=Metric`;
// }

function App() {
  const [text,setText]=useState("Chennai");
  const [icon,setIcon]=useState(snowIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("");
  const [country,setCountry]=useState("");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);
  const [cityNotFound,setcityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);

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


  const search=async()=>{
    let api_key="e1d9696c344d4846d0e9b234b18eb673"
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try{
      let res=await fetch(url);
      let data=await res.json()
      // console.log(data)
      if(data.cod==="404"){
        console.error("City Not Found")
        setcityNotFound(true)
        setLoading(false)
        return ;
      }
      setHumidity(data.main.humidity)
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      setLog(data.coord.lon);
      setLat(data.coord.lat)
      const weatherIconCode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon )
      setcityNotFound(false)

    }catch(error){
      console.error("an error occured:",error.message);

    }finally{
      setLoading(true)


    }
  }
  const handleCity=(e)=>{
    setText(e.target.value)

  }
  const handleKeyDown=(e)=>{
    if(e.key==="Enter"){
      search();
    }

  }
  useEffect(function(){
    search();
  },[])


  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text" className='cityInput' placeholder='Serach City' onChange={handleCity} value={text}  onKeyDown={handleKeyDown}/>
          <div className='search-icon' onClick={()=>search()}>
            <img src={searchIcon} alt='search' className='img'/>
          </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log}  humidity={humidity} wind={wind}/>

        <p className='copy'>
          Designed by <span>Gokul</span>
        </p>
      </div>
    </>
  );
}

export default App;

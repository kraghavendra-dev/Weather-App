import React, { useState, useEffect } from 'react'
import './WeatherPage.css'
import axios from 'axios';

const WeatherPage = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [input, setInput] = useState("");

    useEffect(()=>{
      const query = input ? input : "Hyderabad";
      const fetchData = async ()=>{
        try {
            setLoading(true);
            setError(null);
            setData(null);
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=256e2222e5a3418a99322153261406&q=${query}`);
            setData(response.data);
        } catch (error) {
            setData(null);
            setError(error.message);
        } finally {
            setLoading(false);
        }
      }
      fetchData();
    },[input])
  return (
    <>
    <div className='page-container'>
        <div className='report-container'>
           <div className='card'>
            <div className='heading'>
                <h3>Weather Report</h3>
            </div>
            <div className='searchBox'>
             <input
              type="text"
              placeholder='Search Location...'
              value={input}
              onChange={(e)=>setInput(e.target.value)}
            />
           </div>
           <div className='weather-card'>
            {loading && <p className='loading'>Loading....</p>}
            {error && <p className='error'>{error}</p>}
            {!loading && !error && data && (
              <div className='weather-content'>
                <h1 className='temp'>{data.current.temp_c}<span className='degree'>°C</span></h1>
                <h3 className='city'>{data.location.name}</h3>
                <p className='region'>{data.location.region}</p>
                {/* <p className='condition'><strong>{data.current.condition.text}</strong></p> */}
                <img className="icon" src={data.current.condition.icon} alt={data.current.condition.text} />
                <div className='extra'>
                   <p ><strong>Humidity: {data.current.humidity}%</strong></p>
                   <p><strong>Cloud: {data.current.cloud}%</strong></p>
                   <p><strong>Chance of Rain: {data.current.chance_of_rain}%</strong></p>
                </div>
              </div>
            )}
            {!loading && !error && !data && <p>No data found</p>}
           </div>
           </div>
        </div>
    </div>
    </>
  )
}

export default WeatherPage
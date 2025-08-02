import { useState } from 'react';
import { useEffect } from "react";
import Search from "../search/Search"
import "./weather.css"

function Weather() {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState(null)

    async function fetchWeatherData(param) {
        setLoading(true)
        try {

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e9c3d2c00dda011b3d7cbb3151daf119`)


            const data = await response.json()

            if (data) {
                setWeatherData(data)
                setLoading(false)
            }

        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    async function handleSearch() {
        fetchWeatherData(search)
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }


    useEffect(() => {
        fetchWeatherData("bangalore")
    }, [])

    console.log(weatherData);


    return (
        <>
            <div>
                <Search
                    search={search}
                    setSearch={setSearch}
                    handleSearch={handleSearch}
                />
                {loading && <div className="loading">Loading...</div>}

                <div>
                    <div className="city-name">

                        <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                </div>
                <div className="temp">{weatherData?.main?.temp}</div>
                <p className="Description">
                    {weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].description}
                </p>
                <div className="weather-info">
                    <div className="coloumn">
                        <div>
                            <p className="wind">{weatherData?.wind?.speed}</p>
                            <p>Wind speed</p>
                        </div>
                    </div>
                    <div className="coloumn">
                        <p className="humidity">{weatherData?.main?.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Weather




import React, { useEffect, useState } from "react";
import Search from "../SearchInput/Search";
import "./style.css";
import axios from "axios";

function Top({ data }) {
    let [weatherData, setWeatherData] = useState(null)
    let [errorData,setError] = useState(null);
    let connect = async (name) => {
        try {
            const resp = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=9aaf0a75ac754f73b52130424232803&q=${name}&days=1&aqi=no&alerts=no`)
            setWeatherData(resp.data);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    let getValue = (city) => {
        connect(city);
    }
    useEffect(() => {
        data(weatherData);
    }, [weatherData])

    useEffect(() => {
        connect("Zhytomyr");
    }, [])
    return (
        !weatherData ? <><div><h1>Wait a minute, page is loading...</h1></div></> :
            <>
                <Search onSearch={getValue} />
                <p id="error">{errorData}</p>
                <div id="top">
                    <div id="currently">
                        <p id="city">{weatherData.location.name}, {weatherData.location.region}</p>
                        <h1 id="status">{weatherData.current.condition.text}</h1>
                        <p id="upd">Last update:<span>{weatherData.current.last_updated.slice(-5)}</span></p>
                    </div>
                    <div id="more">
                        <img src={weatherData.current.condition.icon} alt="Icon" id="icon" />
                        <div>
                            <h1>{Math.round(weatherData.current.temp_c)} С°</h1>
                        </div>
                        <div id="about_t">
                            <p>Max temperature:<span>{Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)} С°</span></p>
                            <p>Min temperature:<span>{Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)} С°</span></p>
                            <p>Avg temperature:<span>{Math.round(weatherData.forecast.forecastday[0].day.avgtemp_c)} С°</span></p>
                            <p>Wind speed:<span>{Math.round(weatherData.forecast.forecastday[0].day.maxwind_kph)} (km/h)</span></p>
                        </div>
                    </div>
                </div>
            </>
    );
}

export default Top;
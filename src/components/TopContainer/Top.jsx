import React, { useEffect, useState } from "react";
import Search from "../SearchInput/Search";
import "./style.css";
import axios from "axios";

function Top() {
    let [weatherData, setWeatherData] = useState(null)

    let connect = async (name) => {
        if (!name)
            name = "Zhytomyr";
        try {
            const resp = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=9aaf0a75ac754f73b52130424232803&q=${name}&days=1&aqi=yes&alerts=no`)
            console.log(resp.data);
            setWeatherData(resp.data);
        } catch (error) {
            console.log(error.message);
            document.body.innerHTML = <><div id="error">{error.message}</div></>;
        }
    }

    let getValue = (city) => {
        connect(city);
    }

    useEffect(() => {
        connect();
    }, [])



    return (
        !weatherData ? <><div><h1>Wait a minute, page is loading...</h1></div></> :
            <>
                <Search onSearch={getValue} />
                <div id="top">
                    <div id="currently">
                        <p id="city">{weatherData.location.name}, {weatherData.location.region}</p>
                        <h1 id="status">{weatherData.current.condition.text}</h1>
                        <p id="upd">Last update:<span>{weatherData.current.last_updated.slice(-5)}</span></p>
                    </div>
                    <div id="more">
                        <img src={weatherData.current.condition.icon} alt="Icon" id="icon" />
                        <div>
                            <h1>{weatherData.current.temp_c} С°</h1>
                        </div>
                        <div id="about_t">
                            <p>Min temperature:<span>{weatherData.forecast.forecastday[0].day.maxtemp_c} С°</span></p>
                            <p>Max temperature:<span>{weatherData.forecast.forecastday[0].day.mintemp_c} С°</span></p>
                            <p>Avg temperature:<span>{weatherData.forecast.forecastday[0].day.avgtemp_c} С°</span></p>
                            <p>Wind speed:<span>{weatherData.forecast.forecastday[0].day.maxwind_kph} (km/h)</span></p>
                        </div>
                    </div>
                </div>
            </>
    );
}

export default Top;
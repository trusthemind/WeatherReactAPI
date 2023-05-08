import React, { useEffect, useState } from "react";
import "./style.css";

function Bottom({ sendData }) {
    let [weatherData, setWeatherData] = useState(null)
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        setWeatherData(sendData);
    }, [sendData])

    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) {
        return <div>Loading forecast...</div>;
    }

    const filteredArray = weatherData.forecast.forecastday[0].hour.filter((_, index) => index % 2 === 0);
    console.log(filteredArray);
    return (
        <>
            <div id="bottom">
                <div>
                    <p>{weekday[new Date().getDay()]}</p>
                    <p>Forecast</p>
                    <p>Wind (km/h)</p>
                    <p>Temp(С°)</p>
                </div>
                {filteredArray.map((item) => (<div key={item.time_epoch}>
                    <p id="forecarst-time">{item.time.slice(-5)}</p>
                    <img src={item.condition.icon} alt="icon" />
                    <p>{Math.round(item.wind_kph)} (km/h)</p>
                    <p>{Math.round(item.temp_c)} С°</p>
                </div>))}
            </div>
        </>
    );
}

export default Bottom;
let cityname = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let W_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

const getCountryName = (code) => {
    try {
        return new Intl.DisplayNames([navigator.language], { type: "region" }).of(code);
    } catch (error) {
        console.error("Error getting country name:", error);
        return code;
    }
};

const getDataTime = (dt) =>{
    const curDate = new Date(dt * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(curDate);
    return formattedDate;
};

let city = "kolkata";
citySearch.addEventListener("submit", (e)=>{
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData('imperial');
    cityName.value = " ";
});

const getWeatherData = async (units) =>{
   const weatherUrl = `httppps://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=24940876790c52305de025129ea0606&units=${units}`;
 try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    console.log(data);

    const {main, name, weather, wind, sys, dt} = data;
    cityname.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDataTime(dt);

    W_forecast.innerHTML = weather[0].main;
    
    w_icon.innerHTML = `<img src =https://openweathermap.org/img/wn/${weather[0].icon}@4x.png />`;

    w_temperature.innerHTML = `${((main.temp - 32)*0.55).toFixed(1)}&#176`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
    
    w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;

    const weatherCode = weather[0].main.toLowerCase();
    const body = document.body;
    if (weatherCode.includes('clear')) {
        body.style.backgroundImage = "url('./resources/sunny.jpg')";
    } else if (weatherCode.includes('rain')) {
        body.style.backgroundImage = "url('./resources/rainy.jpg')";
    } else if (weatherCode.includes('clouds')) {
        body.style.backgroundImage = "url('./resources/cloudy.jpg')";
    }else if (weatherCode.includes('haze')) {
        body.style.backgroundImage = "url('./resources/haze.jpg')";
    }else {
        body.style.backgroundImage = "url('./resources/default.jpg')";
    }
 } catch (error) {
    console.log("error");
 }
};

document.body.addEventListener("load", getWeatherData('imperial'));
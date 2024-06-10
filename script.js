const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const place= document.querySelector('.name');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    const api_key = "4c0639cc252bfbb5ba36f08520005253";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    place.innerHTML=`${weather_data.name}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){
        case 'Haze':
            weather_img.src = "assets/haze.png";
            // description.style.color="#99919c";
            description.style.color="lightblue";
            break;
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            description.style.color="#c7c4bf";
            break;
        case 'Clear':
            weather_img.src = "assets/clear.png";
            description.style.color="skyblue";
            break;
        case 'Rain':
            weather_img.src = "assets/rain.png";
            description.style.color="#9099a1";
            break;
        case 'Mist':
            weather_img.src = "assets/mist.png";
            description.style.color="#646D7E";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            description.style.color="lightblue";
            break;

    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});
document.addEventListener('keydown', (event)=> {
    const key = event.key;

    
     if (key === 'Enter') {
        checkWeather(inputBox.value);
    }
    
    
});
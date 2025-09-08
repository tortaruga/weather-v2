const weatherForm = document.querySelector('.weather-form');
const cityInput = document.querySelector('#city-input');
const locationElement = document.querySelector('.location');
const dateElement = document.querySelector('.date');
const tempElement = document.querySelector('.temp');
const conditionElement = document.querySelector('.condition');
const feelsLikeElement = document.querySelector('.feels-like');
const precipitationsElement = document.querySelector('.precipitations');
const windElement = document.querySelector('.wind');
const humidityElement = document.querySelector('.humidity');
const sunriseElement = document.querySelector('.sunrise');
const sunsetElement = document.querySelector('.sunset');
const moonriseElement = document.querySelector('.moonrise');
const moonsetElement = document.querySelector('.moonset');
const moonPhaseElement = document.querySelector('.moon-phase');
const illuminationElement = document.querySelector('.illumination');
const unitsMenu = document.querySelector('#units');
const forecastElement = document.querySelector('.forecast');

let isDay = true;

let city = 'rome';

let unit = 'c'; 

unitsMenu.addEventListener('change', (e) => {
    unit = e.target.value;
    if (!unit) {
        unit = 'c';
    }; 
    fetchData(); 
});

function handleUnit(temp) {
    return unit === 'c' ? `${temp} °C` : `${temp} F`; 
}

function fetchData() {
    fetch(`/.netlify/functions/fetchWeather?city=${encodeURIComponent(city)}`)
    .then(response => response.json())
    .then(data => {
 
        handleImage(data.current.condition.code, data.current['is_day']); 
    
        locationElement.textContent = `${data.location.name}, ${data.location.country}`;
        
        tempElement.textContent = handleUnit(data.current[`temp_${unit}`]);  
         
        dateElement.textContent = getFormattedDate(data.location.localtime); 
        // conditionElement.textContent = data.forecast.forecastday[0].day.condition.text; 
        conditionElement.textContent = data.current.condition.text; 

        feelsLikeElement.textContent = handleUnit(data.current[`feelslike_${unit}`]); 
        precipitationsElement.textContent = data.current.precip_mm; 
        windElement.textContent = data.current.wind_kph;
        humidityElement.textContent = data.current.humidity;

        sunriseElement.textContent = data.forecast.forecastday[0].astro.sunrise; 
        sunsetElement.textContent = data.forecast.forecastday[0].astro.sunset; 
        moonriseElement.textContent = data.forecast.forecastday[0].astro.moonrise; 
        moonsetElement.textContent = data.forecast.forecastday[0].astro.moonset; 
        moonPhaseElement.textContent = data.forecast.forecastday[0].astro.moon_phase; 
        illuminationElement.textContent = data.forecast.forecastday[0].astro.moon_illumination;  
    }); 
} 
 
fetchData();

function getFormattedDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(undefined, options);
}   

const date = new Date('2025-09-08 00:04');
// console.log(date.toLocaleDateString(undefined, {
//       weekday: "long", 
//       year: "numeric", 
//       month: "short",
//       day: "numeric",
//     }));   

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    city = cityInput.value;
    
    fetchData();
})

const now = new Date();
if (now.getHours() >= 17 || now.getHours() < 6) {
    document.querySelector('body').classList.add('dark');
} else {
    document.querySelector('body').classList.remove('dark'); 
}  

let img;
function handleImage(conditionCode, isDay) { 
    if (conditionCode === 1000) {
        img = isDay ? 'url(./images/clear.jpg)' : 'url(./images/night.jpg)';  
    } else if (conditionCode === 1237 || conditionCode === 1261) {
        img = 'url(./images/rainy.jpg)';
    } else if (conditionCode === 1276 || conditionCode === 1282) {
        img = 'url(./images/stormy.jpg)';
    } else if (conditionCode === 1003 || conditionCode === 1006 || conditionCode === 1009) {
        img = 'url(./images/cloudy.jpg)';
    } else if (conditionCode === 1147 || conditionCode === 1030 || conditionCode === 1135) {
        img = 'url(./images/foggy.jpg)';
    } else if (conditionCode === 1087 || conditionCode === 1273 || conditionCode === 1279) {
        img = 'url(./images/stormy.jpg)';
    } else if (conditionCode === 1171 ||  
            conditionCode === 1186 ||
            conditionCode === 1189 ||
            conditionCode === 1192 ||
            conditionCode === 1195 ||
            conditionCode === 1202 ||
            conditionCode === 1243 ||
            conditionCode === 1246) {
                img = 'url(./images/rainy.jpg)';
        } else if (conditionCode === 1198 ||
            conditionCode === 1240 ||
            conditionCode === 1168 ||
            conditionCode === 1063 ||
            conditionCode === 1072 ||
            conditionCode === 1180 ||
            conditionCode === 1150 ||
            conditionCode === 1183 ||
            conditionCode === 1153
        ) {
            img = 'url(./images/rainy.jpg)';
        } else if (conditionCode === 1255 ||
            conditionCode === 1258 ||
            conditionCode === 1225 ||
            conditionCode === 1219 ||
            conditionCode === 1222 ||
            conditionCode === 1213 ||
            conditionCode === 1216 ||
            conditionCode === 1114 ||
            conditionCode === 1066 
        ) {
            img= 'url(./images/snowy.jpg)';
        } else if (conditionCode === 1207 ||
            conditionCode === 1069 ||
            conditionCode === 1204 ||
            conditionCode === 1249 ||
            conditionCode === 1252 ||
            conditionCode === 1117
        ) {
            img = 'url(./images/snowy.jpg)';
        }

        displayImg();  
}

function displayImg() {
    forecastElement.style.backgroundImage = img;
}
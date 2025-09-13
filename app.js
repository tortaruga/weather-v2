const weatherForm = document.querySelector('.weather-form');
const cityInput = document.querySelector('#city-input');
const locationElement = document.querySelector('.location');
const dateElement = document.querySelector('.date');
const timeElement = document.querySelector('.local-time'); 
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
const forecastElement = document.querySelector('.forecast');
const dropDownMenu = document.querySelector('.units-dropdown');

const phaseIconElement = document.querySelector('.phase-icon');
const chanceRainElement = document.querySelector('.chance-rain');
const chanceSnowElement = document.querySelector('.chance-snow'); 
let img;

const hourlyForecastContainer = document.querySelector('.hourly .container');

let isDay = true; 

let city = 'rome';

let unit = 'metric'; 

let identifiers = {
    temp: 'c',
    speed: 'kph',
    volume: 'mm'
} 

const options = document.querySelector('.options');
dropDownMenu.addEventListener('click', () => {
    options.classList.toggle('show');
})

options.addEventListener('click', (e) => {
    unit = e.target.id;
    options.classList.toggle('show');

    if (!unit) {
        unit = 'metric';
    }; 

    handleIdentifier();
    fetchData();
})


function handleIdentifier() {
    if (unit === 'metric') {
        identifiers = {
            temp: 'c',
            speed: 'kph',
            volume: 'mm'
        }
    } else {
        identifiers = {
            temp: 'f',
            speed: 'mph',
            volume: 'in'
        }
    }
}  


function handleUnit(type, value) {
    let result;

    if (type === 'temp') {
        result = unit === 'metric' ? `${value} °C` : `${value} F`;
    } else if (type === 'volume') {
        result = unit === 'metric' ? `${value} mm` : `${value} in`;

    } else if (type === 'speed') {
        result = unit === 'metric' ? `${value} kph` : `${value} mph`;
    }
    return result; 
}

function fetchData() {
    fetch(`/.netlify/functions/fetchWeather?city=${encodeURIComponent(city)}`)  
    .then(response => response.json())
    .then(data => { 
 
        handleImage(data.current.condition.code, data.current['is_day']); 
    
        locationElement.textContent = `${data.location.name}, ${data.location.country}`;
    
        tempElement.innerHTML = `<span><img src=${handleImage()} class="w-[4rem] md:w-[8rem] inline pr-3" alt="weather icon" /></span>` + handleUnit('temp', data.current[`temp_${identifiers.temp}`]);   
           
        dateElement.textContent = getFormattedDate(data.location.localtime); 
        timeElement.textContent = getFormattedTime(data.location.localtime);  
        // conditionElement.textContent = data.forecast.forecastday[0].day.condition.text; 
        conditionElement.textContent = data.current.condition.text; 

        chanceRainElement.textContent = data.forecast.forecastday[0].day["daily_chance_of_rain"] + '%';
        chanceSnowElement.textContent = data.forecast.forecastday[0].day["daily_chance_of_snow"] + '%';

        feelsLikeElement.textContent = handleUnit('temp', data.current[`feelslike_${identifiers.temp}`]); 
        precipitationsElement.textContent = handleUnit('volume', data.current[`precip_${identifiers.volume}`]);
        windElement.textContent = handleUnit('speed', data.current[`wind_${identifiers.speed}`]);;
        humidityElement.textContent = data.current.humidity + '%';
 
        sunriseElement.textContent = data.forecast.forecastday[0].astro.sunrise; 
        sunsetElement.textContent = data.forecast.forecastday[0].astro.sunset; 
        moonriseElement.textContent = data.forecast.forecastday[0].astro.moonrise; 
        moonsetElement.textContent = data.forecast.forecastday[0].astro.moonset; 
        moonPhaseElement.textContent = data.forecast.forecastday[0].astro.moon_phase; 
        displayMoonPhaseIcon(data.forecast.forecastday[0].astro.moon_phase);
        illuminationElement.textContent = data.forecast.forecastday[0].astro.moon_illumination + '%';  

        createDailyHourElements(data.forecast.forecastday[0].hour)
    }); 
} 
 
function createDailyHourElements(data) {
    hourlyForecastContainer.innerHTML = '';
    const hourNow = new Date().getHours();
    
    for (let i = hourNow; i < 24; i++) {
        const div = document.createElement('div');
        div.classList.add("rounded-md", "bg-sky-800/10", "p-4", "text-center", "dark:bg-sky-200/10");     
        hourlyForecastContainer.appendChild(div);

        const hour = document.createElement('p');
        hour.textContent = getFormattedTime(data[i].time);
        div.appendChild(hour); 
        const icon = document.createElement('img');
        icon.classList.add("w-[2rem]", "d-block", "m-auto");       
        icon.src = data[i].condition.icon; 
        div.appendChild(icon);  
        const temp = document.createElement('p');
        temp.textContent =  handleUnit('temp', data[i][`temp_${identifiers.temp}`]);   
        div.appendChild(temp);
    }

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
    return dateObj.toLocaleDateString([], options);
}   

function getFormattedTime(date) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString([], options);
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    city = cityInput.value;
    
    fetchData();
})


function isNight() {
    const now = new Date().getHours();
    return now >= 17 || now < 6;
}
 
document.documentElement.classList.toggle('dark', isNight());   
handleIcons(); 
 
function handleIcons() { 
    const arrowIcon = document.querySelector('#arrow-icon');
    const settingsIcon = document.querySelector('#settings-icon');

    arrowIcon.src = isNight() ? 
                    './images/icons/arrow-down-dark.svg' :
                    './images/icons/arrow-down.svg'; 

    settingsIcon.src = isNight() ?
                    './images/icons/settings.svg' :
                    './images/icons/settings-light.svg';
}

function handleImage(conditionCode, isDay) { 
    if (conditionCode === 1000) {
        img = isDay ? '/images/clear.png' : '/images/night.png';  
    } else if (conditionCode === 1237 || conditionCode === 1261) {
        img = '/images/rainy.png';
    } else if (conditionCode === 1276 || conditionCode === 1282) {
        img = '/images/stormy.png';
    } else if (conditionCode === 1003 || conditionCode === 1006 || conditionCode === 1009) {
        img = '/images/cloudy.png';
    } else if (conditionCode === 1147 || conditionCode === 1030 || conditionCode === 1135) {
        img = '/images/foggy.png';
    } else if (conditionCode === 1087 || conditionCode === 1273 || conditionCode === 1279) {
        img = '/images/stormy.png';
    } else if (conditionCode === 1171 ||  
            conditionCode === 1186 ||
            conditionCode === 1189 ||
            conditionCode === 1192 ||
            conditionCode === 1195 ||
            conditionCode === 1202 ||
            conditionCode === 1243 ||
            conditionCode === 1246) {
                img = '/images/rainy.png';
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
            img = '/images/rainy.png';
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
            img= '/images/snowy.png';
        } else if (conditionCode === 1207 ||
            conditionCode === 1069 ||
            conditionCode === 1204 ||
            conditionCode === 1249 ||
            conditionCode === 1252 ||
            conditionCode === 1117
        ) {
            img = '/images/snowy.png';
        }

        return img;
}
 

function displayMoonPhaseIcon(phase) {
    const normalizedPhase = phase.toLowerCase().replace(' ', '-');
    phaseIconElement.src = `./images/icons/${normalizedPhase}.svg`;
}
 


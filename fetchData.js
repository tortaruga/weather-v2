import * as units from './unitLogic.js';
import * as DOMvars from './DOMvariables.js';
import * as utils from './utils.js';


export function fetchData(url) {
    fetch(url)  
    .then(response => response.json())
    .then(data => displayData(data)); 
} 

function displayData(data) {
        utils.handleImage(data.current.condition.code, data.current['is_day']); 
    
        DOMvars.locationElement.textContent = `${data.location.name}, ${data.location.country}`;
    
        DOMvars.tempElement.innerHTML = `<span><img src=${utils.handleImage()} class="w-[4rem] md:w-[8rem] inline pr-3" alt="weather icon" /></span>` + units.handleUnit('temp', data.current[`temp_${units.identifiers.temp}`]);   
           
        DOMvars.dateElement.textContent = utils.getFormattedDate(data.location.localtime); 
        DOMvars.timeElement.textContent = utils.getFormattedTime(data.location.localtime);  
        // conditionElement.textContent = data.forecast.forecastday[0].day.condition.text; 
        DOMvars.conditionElement.textContent = data.current.condition.text; 

        DOMvars.chanceRainElement.textContent = data.forecast.forecastday[0].day["daily_chance_of_rain"] + '%';
        DOMvars.chanceSnowElement.textContent = data.forecast.forecastday[0].day["daily_chance_of_snow"] + '%';

        DOMvars.feelsLikeElement.textContent = units.handleUnit('temp', data.current[`feelslike_${units.identifiers.temp}`]); 
        DOMvars.precipitationsElement.textContent = units.handleUnit('volume', data.current[`precip_${units.identifiers.volume}`]);
        DOMvars.windElement.textContent = units.handleUnit('speed', data.current[`wind_${units.identifiers.speed}`]);;
        DOMvars.humidityElement.textContent = data.current.humidity + '%';
 
        DOMvars.sunriseElement.textContent = data.forecast.forecastday[0].astro.sunrise; 
        DOMvars.sunsetElement.textContent = data.forecast.forecastday[0].astro.sunset; 
        DOMvars.moonriseElement.textContent = data.forecast.forecastday[0].astro.moonrise; 
        DOMvars.moonsetElement.textContent = data.forecast.forecastday[0].astro.moonset; 
        DOMvars.moonPhaseElement.textContent = data.forecast.forecastday[0].astro.moon_phase; 
        utils.displayMoonPhaseIcon(data.forecast.forecastday[0].astro.moon_phase);
        DOMvars.illuminationElement.textContent = data.forecast.forecastday[0].astro.moon_illumination + '%';  

        utils.createDailyHourElements(data.forecast.forecastday[0].hour)
}
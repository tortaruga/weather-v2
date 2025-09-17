import * as units from './unitLogic.js';
import * as DOMvars from './DOMvariables.js';
import * as utils from './utils.js';

function showMessage(msg) {
  const msgContainer = document.querySelector('.message');
  const messageP = document.querySelector('.msg');
  msgContainer.classList.add('flex');
  msgContainer.classList.remove('hidden');
  messageP.innerHTML = msg;
}

function hideMessage() {
  const msgContainer = document.querySelector('.message');
  const forecastContainer = document.querySelector('.forecast');
  msgContainer.classList.remove('flex');
  msgContainer.classList.add('hidden');

  forecastContainer.classList.remove('hidden');

}

function showFallback() {
  const fallbacks = document.querySelectorAll('.fallback');
  const astro = document.querySelector('.astro');
  const hourlyForecast = document.querySelector('.hourly');

  fallbacks.forEach(fallback => {
    fallback.classList.add('flex');
    fallback.classList.remove('hidden');
  })
  
  astro.classList.remove('flex');
  astro.classList.add('hidden');
  hourlyForecast.classList.add('hidden');
}

function hideFallback() {
  const fallbacks = document.querySelectorAll('.fallback');
  const astro = document.querySelector('.astro');
  const hourlyForecast = document.querySelector('.hourly');

  fallbacks.forEach(fallback => {
    fallback.classList.remove('flex');
    fallback.classList.add('hidden');
  })
  
  astro.classList.add('flex');
  astro.classList.remove('hidden');
  hourlyForecast.classList.remove('hidden');
}

export function fetchData(url) {
    showMessage("Loading data...");
    showFallback();

    fetch(url)  
    .then(response => {
        return response.json();
    })
    .then(data => displayData(data))
    .catch(error => {
      if (error.message === "Failed to fetch") {
        showError("No internet connection or server unreachable");
      }
    });
} 

function showError(error) {
    alert(error);
}

function displayData(data) {

        if (data.error) {showMessage(data.error.message)}; 

        hideMessage();
        hideFallback();
        
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
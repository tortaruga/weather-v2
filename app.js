import * as DOMvars from './DOMvariables.js';
import { fetchData } from './fetchData.js';
import './geolocationLogic.js';
import './themeLogic.js';

let city = 'rome';


fetchData(`/.netlify/functions/fetchWeather?city=${encodeURIComponent(city)}`)


DOMvars.weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    city = DOMvars.cityInput.value;
    
    fetchData(`/.netlify/functions/fetchWeather?city=${encodeURIComponent(city)}`)
})

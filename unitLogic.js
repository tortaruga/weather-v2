import * as DOMvars from './DOMvariables.js';
import { fetchData } from './fetchData.js';
import { getLocation } from './geolocationLogic.js';

export let unit = 'metric'; 
export let identifiers = {
    temp: 'c',
    speed: 'kph',
    volume: 'mm'
} 


DOMvars.dropDownMenu.addEventListener('click', () => {
    DOMvars.options.classList.toggle('show');
})

DOMvars.options.addEventListener('click', (e) => {
    unit = e.target.id;
    DOMvars.options.classList.toggle('show');

    if (!unit) {
        unit = 'metric';
    }; 

    handleIdentifier();

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted' && DOMvars.cityInput.value === '') {
            getLocation();
        } else {
            let city = DOMvars.cityInput.value !== '' ? DOMvars.cityInput.value : 'rome';
           fetchData(`/.netlify/functions/fetchWeather?city=${encodeURIComponent(city)}`);
        }
    });
    
})


export function handleIdentifier() {
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

export function handleUnit(type, value) {
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

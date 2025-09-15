import { fetchData } from "./fetchData.js";

export function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation not supported by this browser.")
    }
}

function error() {
    alert("Sorry, no position available");
}

function success(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
 
    const url = `/.netlify/functions/fetchWeather?lat=${lat}&long=${long}`; 
    fetchData(url);
}

getLocation();
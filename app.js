let city = 'rome';

function fetchData() {
    fetch(`/.netlify/functions/fetchWeatherData?city=${encodeURIComponent(city)}`)
    .then(response => response.json())
    .then(data => console.log(data));
}

const searchBtn = document.querySelector('#search-btn');
const cityInput = document.querySelector('#city-input');

searchBtn.addEventListener('click', () => {
    city = cityInput.value;
    fetchData();
})
const apiKey = '21fe2da93ac2845978f620d99b8162e6';

function getWeatherByZip() {
    const zip = document.getElementById('zipcode').value;
    fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const { lat, lon, name } = data;
            fetchWeatherData(lat, lon, name);
        })
        .catch(error => console.error('Error fetching zip code data:', error));
}

function getWeatherByCity() {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const { lat, lon, name } = data[0];
            fetchWeatherData(lat, lon, name);
        })
        .catch(error => console.error('Error fetching city data:', error));
}

function fetchWeatherData(lat, lon, name) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data, name);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data, name) {
    document.getElementById('current-date').innerText = `Current Date: ${new Date(data.current.dt * 1000).toLocaleDateString()}`;
    document.getElementById('city-name').innerText = `City: ${name}`;
    document.getElementById('current-temp').innerText = `Current Temperature: ${data.current.temp}°F`;
    document.getElementById('current-conditions').innerText = `Current Conditions: ${data.current.weather[0].description}`;
    document.getElementById('temp-hi-lo').innerText = `High: ${data.daily[0].temp.max}°F, Low: ${data.daily[0].temp.min}°F`;
}

function convertTemperature() {
    const currentTempText = document.getElementById('current-temp').innerText;
    const tempF = parseFloat(currentTempText.split(' ')[2]);
    const tempC = (tempF - 32) * 5 / 9;
    document.getElementById('current-temp').innerText = `Current Temperature: ${tempC.toFixed(2)}°C`;
}

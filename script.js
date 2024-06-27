const apiKey = '4479492207e3f757cb6b2037b61195e3'; // Replace with your valid API key

function getWeatherByZip() {
    const zip = document.getElementById('zipcode').value;
    console.log(`Fetching weather for ZIP code: ${zip}`);
    fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching zip code data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Geolocation data:', data);
            const { lat, lon, name } = data;
            fetchWeatherData(lat, lon, name);
        })
        .catch(error => {
            console.error('Error fetching zip code data:', error);
            alert('Failed to fetch weather data. Please check the ZIP code and try again.');
        });
}

function getWeatherByCity() {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    console.log(`Fetching weather for city: ${city}, state: ${state}`);
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching city data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Geolocation data:', data);
            if (data.length === 0) {
                throw new Error('No location found with the given city and state.');
            }
            const { lat, lon, name } = data[0];
            fetchWeatherData(lat, lon, name);
        })
        .catch(error => {
            console.error('Error fetching city data:', error);
            alert('Failed to fetch weather data. Please check the city and state and try again.');
        });
}

function fetchWeatherData(lat, lon, name) {
    console.log(`Fetching weather data for coordinates: ${lat}, ${lon}`);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new

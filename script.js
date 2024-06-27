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
                throw new Error(`Error fetching weather data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);
            if (!data || !data.current || !data.daily) {
                throw new Error('Incomplete weather data received.');
            }
            displayWeatherData(data, name);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again later.');
        });
}

function displayWeatherData(data, name) {
    if (!data.current || !data.daily) {
        console.error('Incomplete weather data:', data);
        alert('Failed to display weather data. Please try again later.');
        return;
    }

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

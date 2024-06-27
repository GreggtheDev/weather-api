document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const zip = document.getElementById('zip').value;
    getWeatherData(zip);
});

function getWeatherData(zip) {
    const apiKey = 'your_actual_api_key'; // Replace 'your_actual_api_key' with your actual OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherData(data) {
    const date = new Date().toLocaleDateString();
    const city = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].description;
    const tempHiLo = `High: ${data.main.temp_max}°F / Low: ${data.main.temp_min}°F`;

    document.getElementById('date').textContent = `Date: ${date}`;
    document.getElementById('city').textContent = `City: ${city}`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°F`;
    document.getElementById('conditions').textContent = `Conditions: ${conditions}`;
    document.getElementById('temp-hi-lo').textContent = tempHiLo;
}

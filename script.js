document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const zip = document.getElementById('zip').value;
    getWeatherData(zip);
});

function getWeatherData(zip) {
    const apiKey = '4479492207e3f757cb6b2037b61195e3'; // Ensure this is correct
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please check the zip code and try again.');
        });
}

function displayWeatherData(data) {
    if (!data || !data.main) {
        console.error('Invalid weather data:', data);
        alert('Failed to retrieve valid weather data. Please try again later.');
        return;
    }
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

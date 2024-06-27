function getWeather() {
    const zipcode = document.getElementById('zipcode').value;
    // Convert the zip code to latitude and longitude
    // You'll need to use the OpenWeather's Geocoding API for this
function getWeather() {
    const zipcode = document.getElementById('zipcode').value;
    const apiKey = "4479492207e3f757cb6b2037b61195e3";
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=${apiKey}`;

    fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            const lat = data.lat;
            const lon = data.lon;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(weatherUrl)
                .then(response => response.json())
                .then(weatherData => {
                    // Extract the necessary data from the API response
                    const date = /* current date */;
                    const city = /* city from the zip code */;
                    const temp = /* current temperature in Fahrenheit */;
                    const conditions = /* current conditions */;
                    // Insert the data into the HTML
                    document.getElementById('weatherData').innerHTML = `
                        <p>Date: ${date}</p>
                        <p>City: ${city}</p>
                        <p>Temperature: ${temp}°F</p>
                        <p>Conditions: ${conditions}</p>
                    `;
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
}
    const lon = /* longitude */;
    const apiKey = "4479492207e3f757cb6b2037b61195e3";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extract the necessary data from the API response
            const date = /* current date */;
            const city = /* city from the zip code */;
            const temp = /* current temperature in Fahrenheit */;
            const conditions = /* current conditions */;
            // Insert the data into the HTML
            document.getElementById('weatherData').innerHTML = `
                <p>Date: ${date}</p>
                <p>City: ${city}</p>
                <p>Temperature: ${temp}°F</p>
                <p>Conditions: ${conditions}</p>
            `;
        })
        .catch(error => console.error('Error:', error));
}

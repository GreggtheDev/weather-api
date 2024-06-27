function getWeather() {
    const zipcode = document.getElementById('zipcode').value;
    // Convert the zip code to latitude and longitude
    // You'll need to use the OpenWeather's Geocoding API for this
    const lat = /* latitude */;
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

document.getElementById('search-btn').addEventListener('click',
    function() {
     const city = document.getElementById('city-input').value;
     console.log('City entered:', city);//fetch code will bw added later
fetchWeatherData(city);
});

async function fetchWeatherData(city) {
const apiKey = 'ae66e47d97fb8d19ab2f6f4626daba99';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


fetch(apiUrl)
.then(response => response.json())
.then(data => {
    console.log("API Response:", data); // Confirm API Response

    document.getElementById("city-name").innerHTML = `City Name: ${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").innerHTML = `Temperature: ${data.main.temp}°C`;
    document.getElementById("weather-description").innerHTML = `Weather: ${data.weather[0].description}`;
})
.catch(error => {
    console.error("Error fetching weather data:", error);
    document.getElementById("weather-info").innerHTML =`<p style="color:red;">Error loading weather data</p>`;
  });

}

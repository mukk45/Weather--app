
document.getElementById('search-btn').addEventListener('click',
    function() {
     const city = document.getElementById('city-input').value;
     console.log('City entered:', city);//fetch code will bw added later
fetchWeatherData(city);
fetch3DayForecast(city);
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

async function fetch3DayForecast(city) {
  const apiKey = "ae66e47d97fb8d19ab2f6f4626daba99"; // Replace with your real OpenWeatherMap API key
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();

    // Filter 12:00 PM forecast for 3 days
    const forecastData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    const dayCards = document.querySelectorAll(".day-card");

    forecastData.forEach((item, index) => {
      if (index < dayCards.length) {
        const card = dayCards[index];

        const date = new Date(item.dt_txt).toDateString();
        const icon =` https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        const temp = `Temperature: ${Math.round(item.main.temp)}°C`;
        const desc = `Weather: ${item.weather[0].description}`;

        const lat =data.city.coord.lat;
        const lon =data.city.coord.lon;

        card.querySelector(".day-date").textContent = date;
        card.querySelector(".day-weather-icon img").src = icon;
        card.querySelector(".day-weather-icon img").alt = desc;
        card.querySelector(".day-temperature").textContent = temp;
        card.querySelector(".day-description").textContent = desc;
        card.querySelector(".coordinates").textContent = `Latitude :${Lat}, Longitude :${lon}`;
      }
    });

  } catch (error) {
    console.error("Error fetching 3-day forecast:", error);
  }
}
  


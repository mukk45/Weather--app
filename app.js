/*let isCelsius = true;
localStorage.removeItem('favorites');
document.getElementById('search-btn').addEventListener('click',
        function() {
         const city = document.getElementById('city-input').value;
         console.log('City entered:', city);//fetch code will bw added later
    fetchWeatherData(city);
    fetch3DayForecast(city);
//     const forecastData = generateWeatherForecast(city);
// console.log(forecastData);
});

document.getElementById('latlon-btn').addEventListener('click', function () {
    const lat = document.getElementById('lat-input').value.trim();
    const lon = document.getElementById('lon-input').value.trim();
  
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      alert("Please enter valid latitude and longitude.");
      return;
    }
  
    fetchLatLonWeather(lat, lon);
    fetch3DayForecastByCoords(lat, lon);
  });

async function fetchWeatherData(city) {
    const apiKey = 'ae66e47d97fb8d19ab2f6f4626daba99';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data); // Confirm API Response

       // Error handling for invalid city name
       if (data.cod && data.cod === "404") {
        alert("City not found. Please enter a valid city name.");
        return;
    }
        document.getElementById("city-name").innerHTML = `City Name: ${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerHTML = `Temperature: ${data.main.temp}°C`;
        document.getElementById("weather-description").innerHTML = `Weather: ${data.weather[0].description}`;
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
        document.getElementById("weather-info").innerHTML = <p style="color:red;">Error loading weather data</p>;
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
          const tempValue = item.main.temp;
          const temp = isCelsius
          ? `Temperature: ${Math.round(tempValue)}°C`
          :`Temperature: ${Math.round((tempValue * 9) / 5 + 32)}°F`;
          const desc = `Weather: ${item.weather[0].description}`;

          const lat =data.city.coord.lat;
          const lon =data.city.coord.lon;
  
          card.querySelector(".day-date").textContent = date;
          card.querySelector(".day-weather-icon img").src = icon;
          card.querySelector(".day-weather-icon img").alt = desc;
          card.querySelector(".day-temperature").textContent = temp;
          card.querySelector(".day-description").textContent = desc;
          card.querySelector(".coordinates").textContent = `Latitude :${lat} , Longitude :${lon}`;
        }
      });
  
    } catch (error) {
      console.error("Error fetching 3-day forecast:", error);
    }
  }
 
  document.getElementById('latlon-btn').addEventListener('click', function () {
    const lat = document.getElementById('lat-input').value;
    const lon = document.getElementById('lon-input').value;

    if (!lat || !lon) {
        alert("Please enter both latitude and longitude");
        return;
    }

    fetchWeatherByCoordinates(lat, lon);
});

async function fetchWeatherByCoordinates(lat, lon) {
    const apiKey = 'ae66e47d97fb8d19ab2f6f4626daba99';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Update UI with weather info
        document.getElementById("city-name").innerHTML = `City Name: ${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerHTML = `Temperature: ${data.main.temp}°C`;
        document.getElementById("weather-description").innerHTML = `Weather: ${data.weather[0].description}`;

        // Auto-fill city input box
        document.getElementById('city-input').value = data.name;

        // Optional: fetch forecast using auto-filled city
        fetch3DayForecast(data.name);

    } catch (error) {
        console.error("Error fetching data by coordinates:", error);
    }
}

 
function fetchLatLonWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error("Invalid coordinates");
        return response.json();
      })
      .then(data => {
        document.getElementById("city-input").value = data.name;
        updateWeatherUI(data);
      })
      .catch(error => {
        alert("Error fetching weather from coordinates.");
        console.error(error);
      });
  }
  
  async function fetch3DayForecastByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey} `;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayForecast(data);
    } catch (error) {
      console.error("3-day forecast error (coords):", error);
    }
  }


document.getElementById('toggle-temp-btn').addEventListener('click', () => {
  isCelsius = !isCelsius;
  document.getElementById('toggle-temp-btn').textContent = isCelsius ? 'Show in °F' : 'Show in °C';

  const city = document.getElementById('city-input').value.trim();
  if (city) {
    fetch3DayForecast(city); // reload forecast with new temp unit
  }
});

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const list = document.getElementById('favorites-list');
  list.innerHTML = '';

  favorites.forEach(city => {
      const li = document.createElement('li');
      li.textContent = city;
      li.addEventListener('click', () => {
          document.getElementById('city-input').value = city;
          fetchWeatherData(city);
          fetch3DayForecast(city);
      });
      list.appendChild(li);
  });
}
document.getElementById('add-favorite-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (!city) return alert("Enter a city name first!");

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (!favorites.includes(city)) {
      favorites.push(city);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      loadFavorites();
      alert(`${city} added to favorites.`);
  } else {
      alert(`${city} is already in favorites.`);
  }
});
 loadFavorites();*/



 
let isCelsius = true;
localStorage.removeItem('favorites');
document.getElementById('search-btn').addEventListener('click',
    function() {
     const city = document.getElementById('city-input').value;
     console.log('City entered:', city);//fetch code will bw added later
fetchWeatherData(city);
fetch3DayForecast(city);
});



document.getElementById('latlon-btn').addEventListener('click', function () {
  const lat = document.getElementById('lat-input').value.trim();
  const lon = document.getElementById('lon-input').value.trim();

  if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
    alert("Please enter valid latitude and longitude.");
    return;
  }

  fetchLatLonWeather(lat, lon);
  fetch3DayForecastByCoords(lat, lon);
});

async function fetchWeatherData(city) {
const apiKey = 'ae66e47d97fb8d19ab2f6f4626daba99';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


fetch(apiUrl)
.then(response => response.json())
.then(data => {
    console.log("API Response:", data); // Confirm API Response

    // Error handling for invalid city name
    if (data.cod && data.cod === "404") {
      alert("City not found. Please enter a valid city name.");
      return;
  }
  
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
        const tempValue = item.main.temp;
          const temp = isCelsius
          ? `Temperature: ${Math.round(tempValue)}°C`
          :`Temperature: ${Math.round((tempValue * 9) / 5 + 32)}°F`;
        const desc = `Weather: ${item.weather[0].description}`;

        const lat =data.city.coord.lat;
        const lon =data.city.coord.lon;

        card.querySelector(".day-date").textContent = date;
        card.querySelector(".day-weather-icon img").src = icon;
        card.querySelector(".day-weather-icon img").alt = desc;
        card.querySelector(".day-temperature").textContent = temp;
        card.querySelector(".day-description").textContent = desc;
        card.querySelector(".coordinates").textContent = `Latitude :${lat}, Longitude :${lon}`;
      }
    });

  } catch (error) {
    console.error("Error fetching 3-day forecast:", error);
  }
}
  
document.getElementById('latlon-btn').addEventListener('click', function () {
  const lat = document.getElementById('lat-input').value;
  const lon = document.getElementById('lon-input').value;

  if (!lat || !lon) {
      alert("Please enter both latitude and longitude");
      return;
  }

  fetchWeatherByCoordinates(lat, lon);
});

async function fetchWeatherByCoordinates(lat, lon) {
  const apiKey = 'ae66e47d97fb8d19ab2f6f4626daba99';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Update UI with weather info
      document.getElementById("city-name").innerHTML = `City Name: ${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").innerHTML = `Temperature: ${data.main.temp}°C`;
      document.getElementById("weather-description").innerHTML = `Weather: ${data.weather[0].description}`;

      // Auto-fill city input box
      document.getElementById('city-input').value = data.name;

      // Optional: fetch forecast using auto-filled city
      fetch3DayForecast(data.name);

  } catch (error) {
      console.error("Error fetching data by coordinates:", error);
  }
}

function fetchLatLonWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Invalid coordinates");
      return response.json();
    })
    .then(data => {
      document.getElementById("city-input").value = data.name;
      updateWeatherUI(data);
    })
    .catch(error => {
      alert("Error fetching weather from coordinates.");
      console.error(error);
    });
}

async function fetch3DayForecastByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}units=matric&appid=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error("3-day forecast error (coords):", error);
  }
}


document.getElementById('toggle-temp-btn').addEventListener('click', () => {
  isCelsius = !isCelsius;
  document.getElementById('toggle-temp-btn').textContent = isCelsius ? 'Show in °F' : 'Show in °C';

  const city = document.getElementById('city-input').value.trim();
  if (city) {
    fetch3DayForecast(city); // reload forecast with new temp unit
  }
});

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const list = document.getElementById('favorites-list');
  list.innerHTML = '';

  favorites.forEach(city => {
      const li = document.createElement('li');
      li.textContent = city;
      li.addEventListener('click', () => {
          document.getElementById('city-input').value = city;
          fetchWeatherData(city);
          fetch3DayForecast(city);
      });
      list.appendChild(li);
  });
}
document.getElementById('add-favorite-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (!city) return alert("Enter a city name first!");

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (!favorites.includes(city)) {
      favorites.push(city);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      loadFavorites();
      alert(`${city} added to favorites.`);
  } else {
      alert(`${city} is already in favorites.`);
  }
});
 loadFavorites();
 
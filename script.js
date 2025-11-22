//const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
//const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
//
//const searchBox = document.querySelector(".search input");
//const searchBtn = document.querySelector(".search button");
//const weatherIcon = document.querySelector(".weather-icon");
//const errorMessage = document.querySelector(".error");
//const weatherContainer = document.querySelector(".weather");
//const cityElement = document.querySelector(".city");
//const tempElement = document.querySelector(".temp");
//const humidityElement = document.querySelector(".humidity");
//const windElement = document.querySelector(".wind");
//
//async function checkWeather(city) {
//  if (!city) {
//    showError("Please enter a city name.");
//    return;
//  }
//
//  try {
//    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
//    
//    if (!response.ok) {
//      throw new Error("City not found");
//    }
//
//    const data = await response.json();
//    updateWeatherUI(data);
//  } catch (error) {
//    showError(error.message);
//  }
//}
//
//function updateWeatherUI(data) {
//  cityElement.innerHTML = data.name;
//  tempElement.innerHTML = Math.round(data.main.temp) + "°C";
//  humidityElement.innerHTML = "Humidity: " + data.main.humidity + "%";
//  windElement.innerHTML = "Wind Speed: " + data.wind.speed + " km/h";
//
//  const weatherCondition = data.weather[0].main;
//  updateWeatherIcon(weatherCondition);
//
//  weatherContainer.style.display = "block";
//  errorMessage.style.display = "none";
//}
//
//function updateWeatherIcon(condition) {
//  const iconMap = {
//    Clouds: "img/clouds.png",
//    Clear: "img/clear.png",
//    Rain: "img/rain.png",
//    Drizzle: "img/drizzle.png",
//    Mist: "img/mist.png",
//  };
//
//  weatherIcon.src = iconMap[condition] || "img/default.png"; // Default icon if condition not found
//}
//
//function showError(message) {
//  errorMessage.innerHTML = message;
//  errorMessage.style.display = "block";
//  weatherContainer.style.display = "none";
//}
//
//searchBtn.addEventListener("click", () => {
//  checkWeather(searchBox.value.trim());
//});
//
//// Optional: Allow pressing "Enter" to search
//searchBox.addEventListener("keypress", (event) => {
//  if (event.key === "Enter") {
//    checkWeather(searchBox.value.trim());
//  }
//});



const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error");
const weatherContainer = document.querySelector(".weather");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

async function checkWeather(city) {
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    showError(error.message);
  }
}

function updateWeatherUI(data) {
  const cityName = data.name;
  const temperature = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const weatherCondition = data.weather[0].main;

  cityElement.innerHTML = cityName;
  tempElement.innerHTML = `${temperature}°C`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;

  updateWeatherIcon(weatherCondition);
  weatherContainer.style.display = "block";
  errorMessage.style.display = "none";

  // Prepare weather data for MongoDB
  const weatherData = {
    city: cityName,
    temperature: temperature,
    humidity: humidity,
    windSpeed: windSpeed,
    condition: weatherCondition
  };

  // Send weather data to backend server
  fetch("http://localhost:3000/api/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(weatherData)
  })
    .then((res) => res.text())
    .then((msg) => console.log("Server:", msg))
    .catch((err) => console.error("Error sending to MongoDB:", err));
}

function updateWeatherIcon(condition) {
  const iconMap = {
    Clouds: "img/clouds.png",
    Clear: "img/clear.png",
    Rain: "img/rain.png",
    Drizzle: "img/drizzle.png",
    Mist: "img/mist.png",
  };

  weatherIcon.src = iconMap[condition] || "img/default.png";
}

function showError(message) {
  errorMessage.innerHTML = message;
  errorMessage.style.display = "block";
  weatherContainer.style.display = "none";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value.trim());
  }
});

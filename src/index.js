
function updateDateTime() {
  let currentTimeElement = document.querySelector("#current-time");
  let now = new Date();
  let options = {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short"
  };
  let formattedDate = now.toLocaleDateString("en-US", options);
  currentTimeElement.innerHTML = formattedDate;
}

updateDateTime();


function searchCity(city) {
  let apiKey = "6400fe35b19cf28a32a44725700d93d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl)
    .then(function (response) {
      let cityNameElement = document.querySelector("#city-name");
      cityNameElement.innerHTML = response.data.name;

      let temperatureElement = document.querySelector("#temperature");
      temperatureElement.innerHTML = Math.round(response.data.main.temp);

      let descriptionElement = document.querySelector("#description");
      descriptionElement.innerHTML = response.data.weather[0].description;

      let humidityElement = document.querySelector("#hum");
      humidityElement.innerHTML = response.data.main.humidity;

      let windElement = document.querySelector("#wind");
      windElement.innerHTML = Math.round(response.data.wind.speed);

      let iconElement = document.querySelector("#icon");
      let iconCode = response.data.weather[0].icon; 
      let iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      iconElement.setAttribute("src", iconUrl);
      iconElement.setAttribute("alt", response.data.weather[0].description);
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}


let form = document.querySelector("#search-city");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
});


function convertToFahrenheit(celsiusTemperature) {
  return Math.round((celsiusTemperature * 9) / 5 + 32);
}


let fahrenheitLink = document.querySelector("#fah");
fahrenheitLink.addEventListener("click", function (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = parseInt(temperatureElement.innerHTML);
  let fahrenheitTemperature = convertToFahrenheit(celsiusTemperature);
  temperatureElement.innerHTML = `${fahrenheitTemperature}°F`;
});

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", function (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = parseInt(temperatureElement.innerHTML);
  let celsiusTemperature = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  temperatureElement.innerHTML = `${celsiusTemperature}°C`;
});


function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    searchCityByCoordinates(latitude, longitude);
  });
}


let currentLocationButton = document.querySelector("#current-position");
currentLocationButton.addEventListener("click", getCurrentLocation);


function searchCityByCoordinates(latitude, longitude) {
  let apiKey = "6400fe35b19cf28a32a44725700d93d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl)
    .then(function (response) {
      let cityNameElement = document.querySelector("#city-name");
      cityNameElement.innerHTML = response.data.name;

      let temperatureElement = document.querySelector("#temperature");
      temperatureElement.innerHTML = Math.round(response.data.main.temp);

      let descriptionElement = document.querySelector("#description");
      descriptionElement.innerHTML = response.data.weather[0].description;

      let humidityElement = document.querySelector("#hum");
      humidityElement.innerHTML = response.data.main.humidity;

      let windElement = document.querySelector("#wind");
      windElement.innerHTML = Math.round(response.data.wind.speed);

      let iconElement = document.querySelector("#icon");
      let iconCode = response.data.weather[0].icon;
      let iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      iconElement.setAttribute("src", iconUrl);
      iconElement.setAttribute("alt", response.data.weather[0].description);
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}


searchCity("Nairobi");

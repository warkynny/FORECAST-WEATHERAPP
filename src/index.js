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

          // Call getWeatherForecast here with the city name
          getWeatherForecast(response.data.name, 5);
        })
        .catch(function (error) {
          console.error("Error fetching weather data:", error);
        });
    }

    function convertToFahrenheit(celsiusTemperature) {
      return Math.round((celsiusTemperature * 9) / 5 + 32);
    }

    function switchTemperatureUnit(unit) {
  let temperatureElement = document.querySelector("#temperature");
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");

  if (unit === "C") {
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.textContent = "°C";
  } else {
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureElement.textContent = "°F";
  }
}


    function getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        searchCityByCoordinates(latitude, longitude);
      });
    }

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

    function getWeatherForecast(city, numberOfDays) {
  let apiKey = "6400fe35b19cf28a32a44725700d93d4"; // Replace with your actual OpenWeatherMap API key
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(function (response) {
      let forecastData = response.data.list;
      let forecastContainer = document.querySelector("#weather-forecast");
      forecastContainer.innerHTML = ""; // Clear previous forecast data

      // Initialize the date to the first date in the forecast data
      let currentDate = new Date(forecastData[0].dt * 1000).getDate();

      // Iterate through the forecast data and display the forecast for each day
      for (let i = 0; i < forecastData.length; i++) {
        let forecast = forecastData[i];
        let date = new Date(forecast.dt * 1000);
        let day = date.toLocaleDateString("en-US", { weekday: "short" });
        let iconCode = forecast.weather[0].icon;
        let maxTemp = Math.round(forecast.main.temp_max);
        let minTemp = Math.round(forecast.main.temp_min);

        // Check if the date is different from the previous date
        if (date.getDate() !== currentDate) {
          currentDate = date.getDate();
          // Create forecast HTML elements
          let forecastDay = document.createElement("div");
          forecastDay.classList.add("col-2");
          forecastDay.innerHTML = `
            <div class="weather-forecast-date">${day}</div>
            <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="" width="42" />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">${maxTemp}°</span>
              <span class="weather-forecast-temperature-min">${minTemp}°</span>
            </div>
          `;

          // Append the forecast to the container
          forecastContainer.appendChild(forecastDay);
        }
      }
    })
    .catch(function (error) {
      console.error("Error fetching weather forecast:", error);
    });
}


    // Initial call to fetch and display the weather for a default city (e.g., Nairobi)
    searchCity("Nairobi");
    updateDateTime();

    // Event listeners
    let form = document.querySelector("#search-city");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let cityInput = document.querySelector("#city-input");
      searchCity(cityInput.value);
    });

    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", function (event) {
      event.preventDefault();
      switchTemperatureUnit("C");
    });

    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", function (event) {
      event.preventDefault();
      switchTemperatureUnit("F");
    });

    let currentLocationButton = document.querySelector("#current-position");
    currentLocationButton.addEventListener("click", getCurrentLocation);
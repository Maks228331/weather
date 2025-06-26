document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "75d1e75d30834169ba9161915252905";

  const select = document.querySelector(".select");
  const searchInput = document.querySelector(".search");
  const searchBtn = document.querySelector(".Serch_btn");
  const weatherOutput = document.getElementById("wether_info");

  const cities = {
    1: "Cherkasy",
    2: "Lviv",
    3: "Kyiv",
    4: "Kharkiv",
    5: "Odesa"
  };

  async function getWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=ua`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        alertify.error("такого міста не існує");
        return;
      }

      const data = await response.json();
      const temp = data.current.temp_c;
      const iconUrl = "https:" + data.current.condition.icon;
      const feelsLike = data.current.feelslike_c;
      const pressure = data.current.pressure_mb;

     
      if (temp < 20) {
        document.body.style.background = "linear-gradient(to top right, #74ebd5, #ACB6E5)";
      } else {
        document.body.style.background = "linear-gradient(to top right, #f77062, #fe5196)";
      }

      weatherOutput.innerHTML = `
        <div class="weatherDisplay">
          <h2 class="city-name">${data.location.name} <img src="${iconUrl}" alt="icon"></h2>
          <div class="weather-details">
            <p class="city_info">Температура: ${temp} °C</p>
            <p class="city_info">Відчувається як: ${feelsLike} °C</p>
            <p class="city_info">Погода: ${data.current.condition.text}</p>
            <p class="city_info">Вологість: ${data.current.humidity}%</p>
            <p class="city_info">Тиск: ${pressure} мбар</p>
            <p class="city_info">Швидкість вітру: ${data.current.wind_kph} км/ч</p>
          </div>
        </div>
      `;

    } catch (error) {
      alertify.alert("помилка");
    }
  }

  select.addEventListener("change", () => {
    const city = cities[select.value];
    getWeather(city);
  });

  searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
      getWeather(city);
    } else {
      alertify.warning("Введіть назву міста.");
    }
  });
});

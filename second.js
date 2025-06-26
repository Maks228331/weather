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
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=3&lang=uk`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        alertify.error("такого міста не існує");
        return;
      }
      const data = await response.json();
      const forecast = data.forecast.forecastday;

      let html = `
        <div class="weatherDisplay">
          <h2 class="city-name">${data.location.name}</h2>
          <div class="weather-forecast-cards">
      `;

      forecast.forEach(day => {
        const date = new Date(day.date).toLocaleDateString('uk-UA', {weekday: 'long', day: 'numeric', month: 'long'});
        html += `
          <div class="weather-card">
            <div class="weather-card-header">
              <span class="weather-date">${date}</span>
              <img src="https:${day.day.condition.icon}" alt="icon" class="weather-icon">
            </div>
            <div class="weather-main-temp">
              <span class="main-temp">${day.day.avgtemp_c}°C</span>
              <span class="weather-desc">${day.day.condition.text}</span>
            </div>
            <div class="weather-details">
              <div><i class="fa-solid fa-temperature-low"></i> Мін: <b>${day.day.mintemp_c}°C</b></div>
              <div><i class="fa-solid fa-temperature-high"></i> Макс: <b>${day.day.maxtemp_c}°C</b></div>
              <div><i class="fa-solid fa-wind"></i> Вітер: <b>${day.day.maxwind_kph} км/год</b></div>
              <div><i class="fa-solid fa-droplet"></i> Вологість: <b>${day.day.avghumidity}%</b></div>
              <div><i class="fa-solid fa-gauge-high"></i> Тиск: <b>${day.hour[12] ? day.hour[12].pressure_mb : '-' } мбар</b></div>
              <div><i class="fa-solid fa-face-smile"></i> Відчувається як: <b>${day.day.avgtemp_c}°C</b></div>
            </div>
          </div>
        `;
      });

      html += `</div></div>`;
      weatherOutput.innerHTML = html;

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
  })
})
// Weather App API Integration
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const weatherIcon = document.querySelector('.weather-icon');
const tempDisplay = document.querySelector('.temp');
const cityDisplay = document.querySelector('.city');
const humidityDisplay = document.querySelector('.humidity');
const windDisplay = document.querySelector('.wind');

// OpenWeatherMap API Key - Replace with your own
const API_KEY = '79da90e259899f3dea23519a3ddf34ed';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Weather icon mapping
const weatherIconMap = {
  'Clear': 'images/clear.png',
  'Clouds': 'images/cloud.png',
  'Rain': 'images/rain.png',
  'Drizzle': 'images/drizzle.png',
  'Mist': 'images/mist.png',
  'Snow': 'images/snow.png',
  'Smoke': 'images/smoke.png',
  'Haze': 'images/haze.png',
  'Dust': 'images/dust.png',
  'Fog': 'images/fog.png',
  'Sand': 'images/sand.png',
  'Ash': 'images/ash.png',
  'Squall': 'images/squall.png',
  'Tornado': 'images/tornado.png'
};

/**
 * Fetch weather data from API
 * @param {string} city - City name
 */
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        alert('Kota tidak ditemukan! Silakan coba kota lain.');
      } else {
        alert('Gagal mengambil data cuaca.');
      }
      return;
    }

    const data = await response.json();
    updateWeatherDisplay(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    alert('Terjadi kesalahan saat mengambil data cuaca.');
  }
}

/**
 * Update weather display with fetched data
 * @param {object} data - Weather data from API
 */
function updateWeatherDisplay(data) {
  const { name, main, weather, wind } = data;

  // Update city name
  cityDisplay.textContent = name;

  // Update temperature
  tempDisplay.textContent = `${Math.round(main.temp)}°C`;

  // Update humidity
  humidityDisplay.textContent = `${main.humidity}%`;

  // Update wind speed
  windDisplay.textContent = `${wind.speed} m/s`;

  // Update weather icon
  const weatherType = weather[0].main;
  const iconPath = weatherIconMap[weatherType] || 'images/cloud.png';
  weatherIcon.src = iconPath;
  weatherIcon.alt = weatherType;
}

/**
 * Handle search functionality
 */
function handleSearch() {
  const city = searchInput.value.trim();
  if (city) {
    fetchWeather(city);
    searchInput.value = '';
  }
}

// Event listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

// Fetch initial weather for Surabaya on page load
window.addEventListener('DOMContentLoaded', () => {
  fetchWeather('Surabaya');
});

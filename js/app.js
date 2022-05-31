const cityForm = document.querySelector('[data-js="change-location"]');
const cityNameContainer = document.querySelector('[data-js="city-name"]');
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]');
const cityTemperatureContainer = document.querySelector('[data-js="city-temperature"]');
const cityCard = document.querySelector('[data-js="city-card"]');
const timeIMG = document.querySelector('[data-js="time"]');
const timeIconContainer = document.querySelector('[data-js="time-icon"]');

const getWeatherData = async (cityName) => {
  const cityData = await getCityData(cityName);

  if(!cityData.length){
    alert('Cidade não encontrada')
    return
  }

  const [{Key, LocalizedName}] = cityData
  const [{ IsDayTime, Temperature, WeatherIcon, WeatherText }] =
    await getCityWeather(Key);
  return {
    LocalizedName,
    IsDayTime,
    Temperature: Temperature.Metric.Value,
    WeatherIcon,
    WeatherText,
  };
};

const showCityWeather = async (event) => {
  event.preventDefault();
  const cityName = event.target.city.value;
  const weatherData = await getWeatherData(cityName);
  event.target.reset();

  if(!weatherData){
    return
  }

  cityNameContainer.textContent = weatherData.LocalizedName;
  cityWeatherContainer.textContent = weatherData.WeatherText;
  cityTemperatureContainer.textContent = weatherData.Temperature;
  timeIMG.src = weatherData.IsDayTime ? "./src/day.svg" : "./src/night.svg";
  timeIconContainer.innerHTML = `<img src="./src/icons/${weatherData.WeatherIcon}.svg"</img>`;

  cityCard.classList.remove("d-none");
};

cityForm.addEventListener("submit", showCityWeather);

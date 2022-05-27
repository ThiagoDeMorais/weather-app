const cityForm = document.querySelector('[data-js="change-location"]');
const cityName = document.querySelector('[data-js="city-name"]');
const cityWeather = document.querySelector('[data-js="city-weather"]');
const cityTemperature = document.querySelector('[data-js="city-temperature"]');
const cityCard = document.querySelector('[data-js="city-card"]');
const timeIMG = document.querySelector('[data-js="time"]');
const timeIconContainer = document.querySelector('[data-js="time-icon"]');

const showCityCard = (containsDNoneClass) => {
  if (containsDNoneClass) {
    cityCard.classList.remove("d-none");
  }
};

const getAllData = async (cityName) => {
  const [{ Key, LocalizedName }] = await getCityData(cityName);
  const [{ IsDayTime, Temperature, WeatherIcon, WeatherText }] =
    await getCityWheather(Key);
  return {
    LocalizedName,
    IsDayTime,
    Temperature: Temperature.Metric.Value,
    WeatherIcon,
    WeatherText,
  };
};

const insertCityDataInToDOM = ({ LocalizedName, WeatherText, Temperature }) => {
  cityName.textContent = LocalizedName;
  cityWeather.textContent = WeatherText;
  cityTemperature.textContent = Temperature;
};

const insertIconsIntoDOM = ({ IsDayTime, WeatherIcon }) => {
  IsDayTime
    ? (timeIMG.src = "./src/day.svg")
    : (timeIMG.src = "./src/night.svg");

  timeIconContainer.innerHTML = `<img src="./src/icons/${WeatherIcon}.svg"</img>`;
};

const executeChainOfFunctions = async (event) => {
  event.preventDefault();
  const inputValue = event.target.city.value;

  insertCityDataInToDOM(await getAllData(inputValue));
  insertIconsIntoDOM(await getAllData(inputValue));
  showCityCard(cityCard.classList.contains("d-none"));
}

cityForm.addEventListener("submit", executeChainOfFunctions );

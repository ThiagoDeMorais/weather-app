const APIKey = "hNyZFhgpS8mQF9rGfmMLhJsoseoaGUAt";
const baseURL = `https://dataservice.accuweather.com/`;
const language = "pt-br";

const getCityURL = (cityName) =>
  `${baseURL}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}&language=${language}`;

const getWheatherURL = (cityKey) =>
  `${baseURL}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=${language}`;

const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro na obtenção dos dados");
    }

    return response.json();
  } catch ({ name, message }) {
    alert(`${name}:${message}`);
  }
};

const getCityData = (cityName) => fetchData(getCityURL(cityName));
const getCityWeather = async (cityKey) => fetchData(getWheatherURL(cityKey));

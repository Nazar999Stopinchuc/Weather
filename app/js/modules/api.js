import { API_KEY_FOR_WEATHER, API_KEY_FOR_CITIES } from "./globals";

export async function getWeatherData(query, isCoordinates = false) {
  try {
    const url = isCoordinates
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY_FOR_WEATHER}&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY_FOR_WEATHER}&units=metric`;


    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    const data = await response.json();

    const weatherData = {
      temp: Math.floor(data.main.temp),
      name: data.name,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      icon: data.weather[0].icon,
      descr: data.weather[0].description
    };

    return weatherData;
  } catch (error) {
    console.log('Ошибка:', error);
    return null;
  }
};

export async function getCitys(citiName) {
  try {

    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${citiName}&sort=-population&limit=10&`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        'X-RapidAPI-Key': API_KEY_FOR_CITIES
      }
    });


    if (!response.ok) {
      console.log(`Request failed with status: ${response.status}`);
      return undefined;
    };

    const info = await response.json();
    return info.data;

  } catch (error) {
    console.log(`Request failed with status: ${response.status}`);
    return undefined;
  }
};

export async function getWeatherByCityName(name) {
  return await getWeatherData(name);
};

export async function getWeatherByCoordinates(lat, lon) {
  return await getWeatherData({ lat, lon }, true);
};



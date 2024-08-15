import { getWeatherByCityName, getWeatherByCoordinates } from "./api";

export async function weatherRender(query, isCoordinates = false) {
  try {
    const cityInfo = isCoordinates
      ? await getWeatherByCoordinates(query.lat, query.lon)
      : await getWeatherByCityName(query);

    const weatherDescription = {
      '01n': 'clear-sky-n',
      '01d': 'clear-sky-d',

      '02n': 'few-clouds-n',
      '02d': 'few-clouds-d',

      '03n': 'few-clouds-n',
      '03d': 'few-clouds-d',

      '04n': 'few-clouds-n',
      '04d': 'few-clouds-d',

      '09n': 'rain-d',
      '09d': 'rain-d',

      '10n': 'rain-d',
      '10d': 'rain-d',

      '11n': 'rain-d',
      '11d': 'rain-d',

      '13n': 'cloudy-n',
      '13d': 'cloudy-d',

      '50n': 'cloudy-n',
      '50d': 'cloudy-d',
      
    }

    const icon = document.querySelector('.weather__img');
    const temp = document.querySelector('.weather__temp');
    const name = document.querySelector('.weather__city');
    const humidity = document.querySelector('#humidity');
    const wind = document.querySelector('#wind');

    temp.textContent = `${cityInfo.temp} °C`;
    name.textContent = isCoordinates ? query.cityName : cityInfo.name;
    humidity.textContent = `${cityInfo.humidity} %`;
    wind.textContent = `${cityInfo.wind_speed} km/h`;
    icon.src = `images/${weatherDescription[cityInfo.icon]}.png`;
  } catch (error) {
    console.log('Ошибка:', error);
  }
};

export async function renderWeatherByCityName(city) {
  await weatherRender(city);
};

export async function renderWeatherByCoordinates(lat, lon, cityName) {
  await weatherRender({ lat, lon, cityName }, true);
};
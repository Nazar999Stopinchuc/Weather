import { getCitys } from "./api";
import { debounce, showError, isNonLatinInput } from "./utils";
import { renderWeatherByCoordinates } from "./render";


export const search = () => {
  const citysList = document.querySelector('.form__search-live');
  const form = document.querySelector('.form');
  const input = document.querySelector('.form__input');
  const debouncedLiveSearch = debounce(liveSearch, 1010);

  async function submitHandler(e) {
    e.preventDefault();

    if (!input.value.trim()) {
      showError('enter city name');
      return;
    };

    if (citysList.children.length >= 1) {
      let lat = citysList.firstElementChild.dataset.lat;
      let lon = citysList.firstElementChild.dataset.lon;
      let cityName = citysList.firstElementChild.dataset.city;

      renderWeatherByCoordinates(lat, lon, cityName);
      input.value = '';
      citysList.innerHTML = '';
      input.placeholder = 'enter city';
    } else return;
  };

  async function liveSearch(value) {
    const citysArr = await getCitys(value);
    citysList.innerHTML = '';

    if (citysArr) {

      for (let k of citysArr) {
        const cityName = k.city || '';
        const country = k.country || '';
        const state = k.region || '';

        const citysListItem = document.createElement('li');
        citysListItem.className = 'form__search-item';
        citysListItem.dataset.city = cityName;
        citysListItem.dataset.lat = k.latitude;
        citysListItem.dataset.lon = k.longitude;
        citysListItem.innerHTML = `<h3>${cityName}</h3><span>${country}, </span><span>${state}</span>`;

        citysList.append(citysListItem);
      };
    };

    if (input.value.length <= 2) {
      citysList.innerHTML = '';
    };
  };



  form.addEventListener('submit', submitHandler);

  input.addEventListener('input', function () {
    const inputVal = this.value.trim();

    if (inputVal == '') {
      return;
    };

    if (isNonLatinInput(inputVal)) {
      input.value = '';
      showError('Enter the city name in English');
      return;
    }

    this.value = inputVal.charAt(0).toUpperCase() + inputVal.slice(1);

    if (inputVal.length >= 2) {
      debouncedLiveSearch(inputVal);
    };
  });

  citysList.addEventListener('click', (e) => {
    const target = e.target;

    if (target.tagName !== 'LI') return;

    renderWeatherByCoordinates(target.dataset.lat, target.dataset.lon, target.dataset.city);
    input.value = '';
    citysList.innerHTML = '';
  });



};




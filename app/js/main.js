import { STARTARTING_CITY } from "./modules/globals";
import { renderWeatherByCityName } from "./modules/render";
import { search } from "./modules/search";


document.addEventListener('DOMContentLoaded', () => {
  renderWeatherByCityName(STARTARTING_CITY);
  search();
});




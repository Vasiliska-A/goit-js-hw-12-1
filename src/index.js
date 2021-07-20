import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import countriesListTmpl from './templates/countriesList.hbs';
import oneCountryTmpl from './templates/oneCountry.hbs';
import './css/styles.css';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  countriesList: document.querySelector('.country-list'),
  countryCard: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries() {
  const inputValue = refs.input.value;
  if (inputValue.trim('') === '') {
    return;
  }

  return fetchCountries(inputValue).then(response => {
    refs.countryCard.innerHTML = '';
    refs.countriesList.innerHTML = '';
    // console.log(response);
    if (response.length === 1) {
      const oneCountryMarkUp = oneCountryTmpl(response);
      const oneCountryCard = refs.countryCard.insertAdjacentHTML('beforeend', oneCountryMarkUp);
    } else if (response.length > 10) {
      Notify.warning('Too many matches found. Please enter a more specific name.');
    } else if (response.length >= 1 && response.length <= 10) {
      const listCountriesMarkUp = countriesListTmpl(response);
      const countriesPreview = refs.countriesList.insertAdjacentHTML(
        'beforeend',
        listCountriesMarkUp,
      );
    }
  });
}

// console.log(refs.input);
// console.log(refs.countriesList);
// console.log(refs.countryCard);

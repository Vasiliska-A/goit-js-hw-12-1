import { Notify } from 'notiflix';

export function fetchCountries(country) {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${country}?fields=name;capital;population;flag;languages`,
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(Notify.failure('Oops, there is no country with that name'));
      }
      return response.json();
    })
    .catch(Error);
}

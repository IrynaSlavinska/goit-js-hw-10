function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds').then(resp => resp.json());
}

export default { fetchBreeds };

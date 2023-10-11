import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const ENDPOINT = 'breeds';
const API_KEY =
  'live_EeMi4coRJyKtnCnWtXAVr9gfkW3D8hDwnsFT4EFhwCZFi1AAiNBZcgSmzo44o1i6';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  return fetch(`${BASE_URL}/${ENDPOINT}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`);
}

export { fetchBreeds, fetchCatByBreed };

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'api_key=live_EeMi4coRJyKtnCnWtXAVr9gfkW3D8hDwnsFT4EFhwCZFi1AAiNBZcgSmzo44o1i6';

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const ENDPOINT = 'breeds';

  return fetch(`${BASE_URL}/${ENDPOINT}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(
    `${BASE_URL}images/search?breed_ids=${breedId}&has_breeds=1`
  );
}

export { fetchBreeds, fetchCatByBreed };

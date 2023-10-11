import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

select.addEventListener('change', onSelectClick);
loader.classList.add('hidden');
error.classList.add('hidden');

let arrayInfo = [];

fetchBreeds()
  .then(resp => {
    resp.map(el => {
      arrayInfo.push({ text: el.name, value: el.id });
    });
    // console.log(arrayInfo);
    new SlimSelect({
      select: '.breed-select',
      data: arrayInfo,
    });
  })
  .catch(onError);

function onSelectClick(evt) {
  const breedId = evt.target.value;
  // console.log(breedId);

  fetchCatByBreed(breedId)
    .then(r => {
      console.log(r);

      const catData = r.data;
      console.log(catData);

      return `<img src="${catData.url}" alt="${catData.name} photo" width="410">
      <h2>Breed: ${catData.name}</h2>
      <p>Description: ${catData.description}</p>
      <p>Tempetament: ${catData.tempetament}</p>`;
    })
    .then(r => {
      return (catInfo.innerHTML = r);
    });
}

// * * * * * * * * * * * * * * * * * * * * * * *
function onError(err) {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

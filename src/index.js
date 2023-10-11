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
// let arrayAbout = [];

fetchBreeds()
  .then(resp => {
    // console.log(resp);
    resp.map(el => {
      // console.log(el);
      arrayInfo.push({ text: el.name, value: el.id });
    });

    // console.log(arrayInfo);
    new SlimSelect({
      select: '.breed-select',
      data: arrayInfo,
    });
    // return resp.map(el =>
    //   arrayAbout.push({
    //     description: el.description,
    //     name: el.name,
    //     temperament: el.temperament,
    //   })
    // );
  })
  .catch(err => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

function onSelectClick(evt) {
  const breedId = evt.target.value;
  console.log(breedId);

  select.classList.add('hidden');
  loader.classList.remove('hidden');
  catInfo.classList.add('hidden');

  fetchCatByBreed(breedId)
    .then(r => {
      select.classList.remove('hidden');
      loader.classList.add('hidden');
      catInfo.classList.remove('hidden');
      // console.log(r);
      const catData = r.data[0];
      console.log(catData);
      // console.log(catData);

      catInfo.innerHTML = createMarkup(catData);
    })
    .catch(err => {
      select.classList.remove('hidden');
      loader.classList.add('hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      catInfo.classList.add('hidden');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * *

function createMarkup({ url, breeds }) {
  const { name, description, temperament } = breeds[0];
  return `<img src="${url}" alt="${name}" width="410">
  <h2>Breed: ${name}</h2>
  <p><b>Description</b>: ${description}</p>
  <p><b>Tempetament</b>: ${temperament}</p>`;
}

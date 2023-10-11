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
let arrayAbout = [];

fetchBreeds()
  .then(resp => {
    resp.map(el => {
      // console.log(el);
      arrayInfo.push({ text: el.name, value: el.id });
    });

    // console.log(arrayInfo);
    new SlimSelect({
      select: '.breed-select',
      data: arrayInfo,
    });
    return resp.map(el =>
      arrayAbout.push({
        description: el.description,
        name: el.name,
        temperament: el.temperament,
      })
    );
  })
  .catch(err => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

function onSelectClick(evt) {
  const breedId = evt.target.value;
  // console.log(breedId);

  select.classList.add('hidden');
  loader.classList.remove('hidden');
  catInfo.classList.add('hidden');

  fetchCatByBreed(breedId)
    .then(r => {
      select.classList.remove('hidden');
      //     console.log(r);
      // console.log(arrayAbout);

      const catData = r.data[0];
      console.log(catData);
      // console.log(arrayAbout);
      return `<img src="${r.data.url}" alt="" width="410">`;
      // <h2>Breed: ${arrayAbout.name}</h2>
      // <p>Description: ${arrayAbout.description}</p>
      // <p>Tempetament: ${arrayAbout.tempetament}</p>`;
    })
    .then(r => {
      loader.classList.add('hidden');
      catInfo.classList.remove('hidden');
      return (catInfo.insertAdjacentElement = r);
    })
    .catch(err => {
      select.classList.remove('hidden');
      loader.classList.add('hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

// * * * * * * * * * * * * * * * * * * * * * * *

function createMarkup(url, { name, description, tempetament }) {
  return `<img src="${url}" alt="" width="410">
  <h2>Breed: ${name}</h2>
  <p>Description: ${description}</p>
  <p>Tempetament: ${tempetament}</p>`;
}

// import { fetchBreeds, fetchCatByBreed } from './cat-api';
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
catInfo.classList.add('hidden');

// console.log(Object.getPrototypeOf(select));
// console.log(select.options);

function onSelectClick(evt) {
  fetchBreeds(params) // params аргументи для розмітки (опис, фото, темперамент)
    .then(
      new SlimSelect({
        select: '.breed-select',
      })
    )
    .catch(err => {
      // console.log(err);
      onError(err);
    });
}

// data => (catInfo.innerHTML = createMarkup(dataInfo)) // dataInfo - масив даних для розмітки
// )

function createMarkup(arr) {
  return (
    arr.map(
      ({}) => `<img src="${'шлях'}" alt="${'порода'}">
		<h2>${'порода'}</h2>
		<p>${'опис'}</p>
    <p>Tempetament: ${'темперамент'}</p>`
    ),
    join('')
  );
}
// * * * * * * * * * * * * * * * * * * * * * * *
function onError(error) {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function onLoad(msg) {}

// Notiflix.Notify.info('Loading data, please wait...');

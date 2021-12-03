import { e, showView } from "./dom.js";
import { showCreate } from "./create.js";
import { showDetails } from "./details.js";

let movieCashe = null;
let lastLoaded = null;
const maxAge = 5000;

// initialization
// - find relevant section
// - detach section from DOM


const homeSection = document.getElementById('home-page');
const catalog = homeSection.querySelector('.card-deck.d-flex.justify-content-center')
homeSection.querySelector('#createLink').addEventListener('click', (event) => {
    event.preventDefault();
    showCreate();
});

catalog.addEventListener('click', (event) => {
    event.preventDefault();
    
    let target = event.target;

    if (target.tagName == 'BUTTON') {
        target = target.parentElement;
    }

    if (target.tagName == 'A') {
        const id = target.dataset.id;
        showDetails(id);
    }
});

homeSection.remove();

// display logic

export function showHome() {
    showView(homeSection);
    getMovies();
}

async function getMovies() {
    catalog.replaceChildren(e('p', {}, 'Loading...'));

    const now = Date.now();
    
    if (movieCashe == null || (now - lastLoaded) > maxAge) {
        lastLoaded = now;

        const res = await fetch('http://localhost:3030/data/movies');
        const data = await res.json();
        movieCashe = data;
    }

    catalog.replaceChildren(...movieCashe.map(createMovieCard));
}

function createMovieCard(movie) {
    const element = e('div', { className: 'card mb-4' });
    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
    alt="Card image cap" width="400">
<div class="card-body">
    <h4 class="card-title">${movie.title}</h4>
</div>
<div class="card-footer">
    <a data-id=${movie._id} href="#">
        <button type="button" class="btn btn-info">Details</button>
    </a>
</div>`

    return element;
}

window.getMovies = getMovies;

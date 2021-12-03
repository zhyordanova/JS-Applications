import { updateUserNav } from "./app.js";
import { showSection, e } from "./dome.js";
import { showLoginPage } from "./login.js";

const catalogSection = document.getElementById('catalogSection');
const ul = catalogSection.querySelector('ul');
catalogSection.remove();


export function showCatalogPage() {
    showSection(catalogSection);

    loadMovies();
}

async function loadMovies() {
    ul.replaceChildren(e('p', {}, 'Loading...'));

    const options = {
        method: 'get',
        headers: {}
    }
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }
    

    const res = await fetch('http://localhost:3030/data/movies', options);

    if (res.status == 403) {
        sessionStorage.removeItem('userData');
        updateUserNav();
        showLoginPage();
    }
    
    const movies = await res.json();

    ul.replaceChildren(...movies.map(createMovieCard));
}

function createMovieCard(movie) {
    return e('li', {}, movie.title);
}
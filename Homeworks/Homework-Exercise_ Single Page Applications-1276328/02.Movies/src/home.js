import { showAddMovie } from "./addMovie.js";
import { e, showView } from "./dom.js";
import { showExample } from "./example.js";

const section = document.getElementById('home-page');
const userData = sessionStorage.getItem('userData');
const list = document.getElementById('catalog');
const addBtn = section.querySelector('a');
addBtn.addEventListener('click', showAddMovie);

if (userData != null) {
section.querySelector('#catalog').addEventListener('click', showExample);
}
section.remove();

export function showHome() {
    showView(section);

    if (userData == null) {
        addBtn.style.display = 'none';
    } else {
        addBtn.style.display = '';
    }

    getMovies();
   
}

async function getMovies() {
    try{
    const res = await fetch('http://localhost:3030/data/movies');
    if (res.ok != true) {
        const error = await res.json();
        throw new Error(error.message);
    }
    const data = await res.json();
    list.replaceChildren(...Object.values(data).map(displayCatalog));
    } catch(err) {
        alert(err.message);
    }
}

function displayCatalog(movie) {
    const divEl = e('div', {class: "card mb-4" }, 
        e('img', {class: "card-img-top", src : `${movie.img}`, alt: "Card image cap", width: "400"} ),
        e('div', {class: "card-body" },
            e('h4', {class: "card-title"}, `${movie.title}`)
        ),
        e('div', {class: "card-footer"}, 
            e('a', {href: '#'}, 
                e('button', {type: 'button', class: "btn btn-info", 'data-id': `${movie._id}`}, 'Details')
            )
        )
    )
    return divEl;
}
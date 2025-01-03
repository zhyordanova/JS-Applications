import { showView } from "./dom.js";

const section = document.getElementById('movie-example');
section.remove();

export function showExample(ev) {
    showView(section);
    const id = ev.target.dataset.id;

    getMovieById(id);
}

async function getMovieById(id) {
    try{
    const res = await fetch('http://localhost:3030/data/movies/' + id);
    if (res.ok != true) {
        const error = await res.json();
        throw new Error(error.message);
    }
    const data = (await res.json());
    displayMovieDetails(data);
    }catch(err) {
        alert(err.message);
    }
}

function displayMovieDetails(data) {
    const divEl = document.createElement('div');
    divEl.className = 'container';
    divEl.innerHTML = `
    <div class="row bg-light text-dark">
        <h1>Movie title: ${data.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src=${data.img}
                alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${data.description}</p>
            <a class="btn btn-danger" href="#">Delete</a>
            <a class="btn btn-warning" href="#">Edit</a>
            <a class="btn btn-primary" href="#">Like</a>
            <span class="enrolled-span">Liked 1</span>
        </div>
    </div>
</div>`
section.replaceChildren(divEl);
}

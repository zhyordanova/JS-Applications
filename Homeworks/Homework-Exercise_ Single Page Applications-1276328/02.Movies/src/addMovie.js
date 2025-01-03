import { showView } from "./dom.js";
import { showHome } from "./home.js";

const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', addMovie);
section.remove();

export function showAddMovie() {
    showView(section);
}

async function addMovie(ev) {
    ev.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const token = userData.token;
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const image = formData.get('imageUrl');

    if (title == undefined || title.trim() == '' || description == undefined || description.trim() == '' || image == undefined || image.trim() == '') {
        alert('All fields must be filled!');
        return;
    }
    try {
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'X-Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, image })
        })

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        showHome();
    } catch (err) {
        alert(err.message);
    }
}
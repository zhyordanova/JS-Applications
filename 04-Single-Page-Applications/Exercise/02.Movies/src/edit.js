import { showView } from './dom.js';
import { showHome } from './home.js';


const editSection = document.getElementById('edit-movie');
const form = editSection.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));
editSection.remove();

export async function showEdit(id){
    showView(editSection)

    const movie = await getMovieById(id);

    editSection.querySelector('[name="id"]').value = id;
    editSection.querySelector('[name="title"]').value = movie.title;
    editSection.querySelector('[name="description"]').value = movie.description;
    editSection.querySelector('[name="imageUrl"]').value = movie.img;
}

async function getMovieById(id) {
    const response = await fetch('http://localhost:3030/data/movies/' + id);
    const movie = await response.json();

    return movie;
}

async function onSubmit(data) {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;

    if (data.title == '' || data.description == '' || data.imageUrl == '') {
        alert('All fields are required!');
        return;
    }

    try {
        const res = await fetch('http://localhost:3030/data/movies/' + data.id, { 
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                img: data.imageUrl
            })
        });

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const result = await res.json();

        form.reset();
        showHome(result.id);

    } catch (err) {
        alert(err.message);
    }
}


import { showView } from "./dom.js";
import { showHome } from "./home.js";

// initialization
// - find relevant section
// - detach section from DOM

const createSection = document.getElementById('add-movie');
const form = createSection.querySelector('form');
createSection.addEventListener('submit', onCreate);

createSection.remove();

// display logic

export function showCreate() {
    showView(createSection);
}

async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const movie = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')
    };

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (movie.title == '' || movie.description == '' || movie.img == '') {
        alert('All fields are required!');
        return;
    }

    try {
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(movie)
        })
    
        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }
    
        const data = await res.json();

        form.reset();
        showHome();

    } catch(err) {
        alert(err.message);
    }
}
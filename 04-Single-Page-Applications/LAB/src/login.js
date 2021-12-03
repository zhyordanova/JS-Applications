import { updateUserNav } from "./app.js";
import { showSection } from "./dome.js";
import { showHomePage } from "./home.js";

const loginSection = document.getElementById('loginSection');
loginSection.remove();
const form = loginSection.querySelector('form');
form.addEventListener('submit', onSubmit);


export function showLoginPage() {
    showSection(loginSection);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();

        const userData = {
            username: data.username,
            id: data._id,
            token: data.accessToken
        };

        sessionStorage.setItem('userData', JSON. stringify(userData));

        updateUserNav();
        showHomePage();

    } catch (err) {
        alert(err.message);
    }

}
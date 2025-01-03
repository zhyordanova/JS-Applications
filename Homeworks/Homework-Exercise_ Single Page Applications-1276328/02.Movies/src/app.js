
import { showAddMovie } from "./addMovie.js";
import { showEdit } from "./edit.js";
import { showExample } from "./example.js";
import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";

const userData = JSON.parse(sessionStorage.getItem('userData'));
const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
}

const navEl = document.querySelector('nav');
navEl.addEventListener('click', (event) => {
    const view = views[event.target.id];
    if (typeof view == 'function') {
        event.preventDefault();
        view();
    }
})

navEl.querySelector('#logoutBtn').addEventListener('click', async (event) => {
    const token = userData.accessToken;
    event.stopImmediatePropagation();
    try {
        const res = await fetch('http://localhost:3030/users/logout', {
            headers: { "X-Authorization": token }

        })
        if (res.status == 204) {
            sessionStorage.removeItem('userData');
            showLogin();
            updateHome();
        }
    } catch (err) {
        alert(err.message);
    }
})


updateHome();
showHome();

export function updateHome() {
    if (userData == null) {
        [...navEl.querySelectorAll('.guest')].map(el => el.style.display = 'block');
        [...navEl.querySelectorAll('.user')].map(el => el.style.display = 'none');
    } else {
        [...navEl.querySelectorAll('.guest')].map(el => el.style.display = 'none');
        [...navEl.querySelectorAll('.user')].map(el => el.style.display = 'block');
        navEl.querySelector('#welcome').textContent = `Welcome, ${userData.email}`;
    }
}
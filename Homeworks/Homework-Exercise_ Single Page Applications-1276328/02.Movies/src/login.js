import { updateHome } from "./app.js";
import { showView } from "./dom.js";

const section = document.getElementById('form-login');
const form = document.querySelector('form');
form.addEventListener('submit', loginUser);
section.remove();

export function showLogin() {
    showView(section);
}

async function loginUser(ev) {
    ev.preventDefault()

    const formData = new FormData(ev.target);
    const email = formData.get('email');
    const password = formData.get('password');

    form.reset();

    if (email == undefined || email.trim() == ''){
        alert('Email must be filled!');
        return;
    }

    if (password == undefined || password.length < 6) {
        alert('Password must be at least 6 symbols long!')
        return;
    }
 
    try{

        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken
        }));
      updateHome();
       showHome();
    } catch(err) {
        alert(err.message);
    }
}
import { updateHome } from "./app.js";
import { showView } from "./dom.js";
import { showHome } from "./home.js";

const section = document.getElementById('form-sign-up');
const form = document.querySelector('form');
form.addEventListener('submit', registerUser);
section.remove();

export function showRegister() {
    showView(section);
}

async function registerUser(ev) {
    ev.preventDefault()

    const formData = new FormData(ev.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeat = formData.get('repeatPassword');

    form.reset();
    if (password != repeat) {
        alert('Passwords don\'t match!');
        return;
    }

    if (email == undefined || email.trim() == ''){
        alert('Email must be filled!');
        return;
    }

    if (password == undefined || password.length < 6) {
        alert('Password must be at least 6 symbols long!')
        return;
    }
 
    try{

        const res = await fetch('http://localhost:3030/users/register', {
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
    
};

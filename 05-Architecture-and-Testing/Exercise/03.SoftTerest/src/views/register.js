import { register } from "../api/data.js";
import { e } from "../dom.js";

const section = document.getElementById('registerPage');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let context = null;

export async function showRegisterPage(ctxTarget) {
    context = ctxTarget;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('repeatPassword').trim();

    if (!email || !password) {
        return alert('All fields are required!');
    }

    if (password != repass) { 
        return alert('Passwords don\`t mach!');
    }

    await register(email, password);
    form.reset();
    context.goTo('home');
    context.updateNav();
}
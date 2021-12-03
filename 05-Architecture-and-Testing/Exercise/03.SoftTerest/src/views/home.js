import { e } from "../dom.js";

const section = document.getElementById('homePage');
section.remove();
section.querySelector('#getStartedLink').addEventListener('click', (event) => {
    event.preventDefault();
    context.goTo('dashboard');
});

let context = null;

export async function showHomePage(ctxTarget) {
    context = ctxTarget;
    context.showSection(section);
}
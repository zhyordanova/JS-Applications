import { showSection } from './dom.js';
import { showHomePage } from './views/home.js';
import { showDashboardPage } from './views/dashboard.js';
import { showLoginPage } from './views/login.js';
import { showRegisterPage } from './views/register.js';
import { showCreatePage } from './views/create.js';
import { showDetailsPage } from './views/details.js';
import { logout } from './api/data.js';


const links = {
    'homeLink': 'home',
    'getStartedLink': 'home',
    'dashboardLink': 'dashboard',
    'loginLink': 'login',
    'registerLink': 'register',
    'createLink': 'create'
};

const views = {
    'home': showHomePage,
    'dashboard': showDashboardPage,
    'login': showLoginPage,
    'register': showRegisterPage,
    'create': showCreatePage,
    'details': showDetailsPage,
};

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);

document.getElementById('logoutBtn').addEventListener('click', async (event) => {
    event.preventDefault();
    await logout();
    updateNav();
    goTo('home');
})

const context = {
    goTo,
    showSection,
    updateNav
}

updateNav();
// Start application in home view
goTo('home');

function onNavigate(event) {
    const name = links[event.target.id];
    if (name) {
        event.preventDefault();
        goTo(name);
    }
}

function goTo(name, ...params) {
    const view = views[name];
    if (typeof view == 'function') {
        view(context, ...params);
    }
}

export function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        [...nav.querySelectorAll('.user-nav')].forEach(l => l.style.display = 'block');
        [...nav.querySelectorAll('.guest-nav')].forEach(l => l.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user-nav')].forEach(l => l.style.display = 'none');
        [...nav.querySelectorAll('.guest-nav')].forEach(l => l.style.display = 'block');
    }
}
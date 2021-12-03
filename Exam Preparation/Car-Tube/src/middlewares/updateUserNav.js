import { getUserData } from '../util.js';

export function updateUserNav() {
    const userData = getUserData();

    if(userData) {
        document.getElementById('profile').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user-greeting').textContent = `Welcome, ${userData.username}`;
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}
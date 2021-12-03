import { getUserData } from '../util.js';

export function updateUserNav() {
    const userData = getUserData();

    if(userData) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        // document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}
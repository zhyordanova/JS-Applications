import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats as catData } from './catSeeder.js';

// template: 
// - contains cat info
// - has toggle button

const catCard = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${() => toggleInfo(cat)} class="showBtn">${cat.info ? 'Hide' : 'Show'} status code</button>
        ${cat.info ? html`<div class="status" id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>` : null}
    </div>
</li>`;

// start:
// - parse import data
// - pass to template

// *console.log(catData[0]);

const root = document.getElementById('allCats');

catData.forEach(c => c.info = false);
update();

function update() {
    render(html`<ul>${catData.map(catCard)}</ul>`, root);
}

function toggleInfo(cat) {
    cat.info = !cat.info;
    update();
}
import { html } from '../lib.js';
import { searchCar } from '../api/data.js';
import { carCard } from './common.js';

const searchTemplate = (cars, onSearch, year) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${year || ''}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${cars.length == 0
            ? html`<p class="no-cars"> No results.</p>` 
            : cars.map(carCard)}
        
    </div>
</section>`;


export async function searchPage(ctx) {
    const year = Number(ctx.querystring.split('=')[1]);
    const cars = Number.isNaN(year) ? [] : await searchCar(year);

    ctx.render(searchTemplate(cars, onSearch, year));

    function onSearch() {
        const query = Number(document.getElementById('search-input').value);

        if (Number.isNaN(query) == false) {
            ctx.page.redirect('/search?query=' + query);
        } else {
            return alert('Year must be a positive number!');
        }
    }
}
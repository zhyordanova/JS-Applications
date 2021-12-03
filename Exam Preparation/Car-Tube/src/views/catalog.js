import { html } from '../lib.js';
import { getAllCars, getCollectionSize } from '../api/data.js';
import { carCard } from './common.js';

const catalogTemplate = (cars, page, pages) => html`<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        <div>
            Page ${page} / ${pages}
            ${page > 1 ? html`<a class="button-list" href="/cars?page=${page - 1}">&lt; Prev</a>` : ''}
            ${page < pages ? html`<a class="button-list" href="/cars?page=${page + 1}">Next &gt;</a>` : ''}
        </div>

        ${cars.length == 0
            ? html`<p class="no-cars">No cars in database.</p>`
            : cars.map(carCard)}
            
    </div>
</section>`;


export async function catalogPage(ctx) {
    const page = Number(ctx.querystring.split('=')[1]) || 1;
    const count = await getCollectionSize();
    const pages = Math.ceil(count / 3);

    const cars = await getAllCars(page);
    ctx.render(catalogTemplate(cars, page, pages));
}
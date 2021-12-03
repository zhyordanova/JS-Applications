import { html } from '../lib.js';
import { getUserData } from '../util.js';
import { getMyCars } from '../api/data.js';
import { carCard } from './common.js';

const myCarsTemplate = (cars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    
    ${cars.length == 0
        ? html`<p class="no-cars"> You haven't listed any cars yet.</p>`
        : html`<div class="listing">
            ${cars.map(carCard)}
        </div>`}
        
</section>`;

export async function myCarsPage(ctx) {
    const userData = getUserData();
    const cars = await getMyCars(userData.id);

    ctx.render(myCarsTemplate(cars));
}
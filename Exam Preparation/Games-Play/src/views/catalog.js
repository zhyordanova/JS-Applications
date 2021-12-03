import { html } from '../lib.js';
import { getRecentGames } from '../api/data.js';
import { gameCard } from './common.js';

const catalogTemplate = (games) => html`
<section id="catalog-page">
    <h1>All Games</h1>

    ${games.length == 0 
        ? html`<h3 class="no-articles">No articles yet</h3>`
        : games.map(gameCard)}
    
</section>`;


export async function catalogPage(ctx) {
    const games = await getRecentGames();
    ctx.render(catalogTemplate(games));
}
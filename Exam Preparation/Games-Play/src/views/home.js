import { html } from '../lib.js';
import { getRecentGames } from '../api/data.js';
import { recentCard } from './common.js';

const homeTemaplate = (recentgames) => html`<section id="welcome-world">

    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">

    <div id="home-page">
        <h1>Latest Games</h1>

        ${recentgames.length == 0
            ? html`<p class="no-articles">No games yet</p>`
            : recentgames.map(recentCard)}
            
    </div>
</section>`;


export async function homePage(ctx) {
    const recentgames = await getRecentGames();
    ctx.render(homeTemaplate(recentgames))
}
import { html } from '../lib.js';
import { getAllAlbums } from '../api/data.js';

const homeTemplate = () => html`
<section id="welcomePage">
    <div id="welcome-message">
        <h1>Welcome to</h1>
        <h1>My Music Application!</h1>
    </div>

    <div class="music-img">
        <img src="./images/musicIcons.webp">
    </div>
</section>`;


export async function homePage(ctx) {

    const books = await getAllAlbums();

    ctx.render(homeTemplate(books));
}
import { html } from '../lib.js';
import { searchAlbums } from '../api/data.js';
import { albumCard } from './common.js';

const searchTemplate = (albums, onSearch, albumName) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value=${albumName || ''}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
        ${albumName && albums.length == 0
            ? html`<p class="no-result">No result.</p>`
            : albums.map(albumCard)} 
    </div>
</section>`;

export async function searchPage(ctx) {
    const albumName = ctx.querystring.split('=')[1];
    let albums = [];

    if (albumName) {
        albums = await searchAlbums(albumName);
    }

    ctx.render(searchTemplate(albums, onSearch, albumName));

    function onSearch() {

        const query = document.getElementById('search-input').value;

        if (query == '') {
            return alert('Please enter Album name')
        } else {
            ctx.page.redirect('/search?query=' + query);
        }
    }
}
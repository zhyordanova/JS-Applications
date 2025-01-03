import { html } from '../lib.js';
import { getUserData } from '../util.js';


export const albumCard = (album) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        <div class="btn-group">
            ${getUserData() ? html`<a href="/details/${album._id}" id="details">Details</a>`: null}
        </div>
    </div>
</div>`;





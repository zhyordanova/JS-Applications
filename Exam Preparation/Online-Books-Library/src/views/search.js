import { html } from '../lib.js';
import { searchBooks } from '../api/data.js';
import { bookCard } from './common.js';


const searchTemplate = (books, onSearch, params = '') => html`
<section id="search-page" class="search">
    <h1>Search</h1>

    <form @submit=${onSearch}>
        <input type="text" name="search" .value=${params}>
        <input type="submit" value="Search">
    </form>

    ${books.length == 0
        ? html`<p class="no-books">No results!</p>` 
        : html`<ul class="other-books-list">
            ${books.map(bookCard)}
        </ul>`}
</section>`;


export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let books = [];

    if (params) {
        books = await searchBooks(decodeURIComponent(params));
    }

    ctx.render(searchTemplate(books, onSearch, params));

    function onSearch(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const search = formData.get('search');

        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }
}
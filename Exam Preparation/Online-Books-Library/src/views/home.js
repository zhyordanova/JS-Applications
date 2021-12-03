import { html } from '../lib.js';
import { getAllBooks } from '../api/data.js';
import { bookCard } from './common.js';

const homeTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${books.length == 0
    // <!-- Display paragraph: If there are no books in the database -->
        ? html`<p class="no-books">No books in database!</p>` 
    // <!-- Display ul: with list-items for All books (If any) -->
        : html`<ul class="other-books-list">
            ${books.map(bookCard)}
        </ul>`}
</section>`;


export async function homePage(ctx) {
    const books = await getAllBooks();

    ctx.render(homeTemplate(books));
}
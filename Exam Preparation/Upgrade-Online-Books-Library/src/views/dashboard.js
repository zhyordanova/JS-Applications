import { html } from '../lib.js';
import { getAllBooks } from '../api/data.js';
import { bookCard } from './common.js';

const dashboardTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>

    ${books.length == 0
        ? html`<p class="no-books">No books in database!</p>`
        : html`<ul class="other-books-list">
                ${books.map(bookCard)}
            </ul>`}
    <!-- Display ul: with list-items for All books (If any) -->

    <!-- Display paragraph: If there are no books in the database -->

</section>`;


export async function dashboardPage(ctx) {
    const books = await getAllBooks();

    ctx.render(dashboardTemplate(books));
}
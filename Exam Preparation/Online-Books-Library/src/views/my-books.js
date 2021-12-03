import { html } from '../lib.js';
import { getMyBooks } from '../api/data.js';
import { bookCard } from './common.js';
import { getUserData } from '../util.js';

const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>

    ${books.length == 0
    // <!-- Display paragraph: If there are no books in the database -->
        ? html`<p class="no-books">No books in database!</p>` 
    // <!-- Display ul: with list-items for All books (If any) -->
        : html`<ul class="my-books-list">
            ${books.map(bookCard)}
            
        </ul>`}
</section>`;


export async function myBooksPage(ctx) {
    const userData = getUserData();
    const books = await getMyBooks(userData.id);

    ctx.render(myBooksTemplate(books));
}
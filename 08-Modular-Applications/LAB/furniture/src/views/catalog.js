import { getAll, getMyItems } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData, parseQuerystring } from '../util.js';

const catalogTemplate = (dataPromise, userPage, onSearch, search) => html`
<div class="row space-top">
    <div class="col-md-12">

        ${userPage 
            ? html`
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>` 
            : html`
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>`}

    </div>

    <div class="col-md-12">

        <form @submit=${onSearch}>
            <input type="text" name="search" .value=${search}>
            <input type="submit" value="Search">
        </form>

    </div>  
</div>

<div class="row space-top">

    ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
    
</div>`;

const pageTemplate = (page, pages, search) => html`
<div>

    ${page > 1 ? html`<a class="page-index btn btn-info" href=${createPageHref(page, -1, search)}>&lt; Prev</a>` : null}
    ${page < pages ? html`<a class="page-index btn btn-info" href=${createPageHref(page, 1, search)}>Next &gt;</a>` : null}

</div>`;

const itemTemplate = (item) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${item.img} />
            <p>${item.description}</p>
            <footer>
                <p>Price: <span>${item.price} $</span></p>
            </footer>
            <div>
                <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`;

function createPageHref(page, step, search) {
    return `?page=${page + step}` + (search ? `&search=${search}` : '');
}

export function catalogPage(ctx) {
    const query = parseQuerystring(ctx.querystring);
    const page = Number(query.page || 1);
    const search = query.search || '';

    const userPage = ctx.pathname == "/my-furniture";
    ctx.render(catalogTemplate(loadItems(userPage, page, search), userPage, onSearch, search));

    function onSearch(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const searchParam = formData.get('search').trim();

        if (searchParam) {
            ctx.page.redirect(`?search=${searchParam}`);
        } else {
            ctx.page.redirect('/');
        }
    }
}

async function loadItems(userpage, page, search) {
    let items = [];

    if (userpage) {
        const userId = getUserData().id;
        items = await getMyItems(userId);
    } else {
        items = await getAll(page, search);
    }

    return [
        pageTemplate(page, items.pages, search),
        ...items.data.map(itemTemplate)
    ];
}
import page from '//unpkg.com/page/page.mjs';

function homePage() {
    main.innerHTML = '<h2>Home Page</h2><p>Welcome to our site!</p>';
}

function catalogPage() {
    main.innerHTML = '<h2>Catalog</h2><p>List of items</p><a href="/catalog/1234">Ptoduct</a>';
}

function detailsPage(ctx) {
    console.log(ctx)
    main.innerHTML = '<h2>Product</h2><p>Product details</p><button>Buy now</button>';

    document.querySelector('button').addEventListener('click', () => {
        page.redirect('/checkout');
    })
}

function checkoutPage() {
    main.innerHTML = '<h2>Cart Details</h2><p>Products in cart</p>';
}

function aboutPage() {
    main.innerHTML = '<h2>About Us</h2><p>Contact: +1-555-1598</p>';
}


const views = {
    '/catalog/kitchens': () => '<h2>Kitchen equipment</h2><p>List of kitchen items</p>',
}

const main = document.querySelector('main');

page('/home', homePage);
page('/catalog', catalogPage);
page('/catalog/:productNumber', detailsPage);
page('/catalog/category/:productNumber', detailsPage);
page('/checkout', checkoutPage);
page('/about', aboutPage);

page.redirect('/', '/home');
page.start();

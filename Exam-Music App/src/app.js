import { logout } from "./api/data.js";
import { page } from "./lib.js";
import decoratorContext from "./middlewares/decoratorContext.js";
import { updateUserNav } from "./middlewares/updateUserNav.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { searchPage } from "./views/search.js";

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decoratorContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);


updateUserNav();
page.start();

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}
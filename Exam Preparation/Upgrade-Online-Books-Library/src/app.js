import { page } from "./lib.js";
import decoratorContext from "./middlewares/decoratorContext.js";
import { updateUserNav } from "./middlewares/updateUserNav.js";
import { dashboardPage } from "./views/dashboard.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/data.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myBooksPage } from "./views/my-books.js";

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decoratorContext);
page('/', dashboardPage)
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-books', myBooksPage);

updateUserNav();
page.start();

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}
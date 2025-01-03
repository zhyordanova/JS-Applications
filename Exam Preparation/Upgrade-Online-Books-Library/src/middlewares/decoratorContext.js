import { render } from '../lib.js';
import { updateUserNav } from './updateUserNav.js';

const root = document.getElementById('site-content');

export default function decoratorContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}
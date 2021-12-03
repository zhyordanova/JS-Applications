import { html } from '../lib.js';

const registerTemplate = () => html`
<section id="form-register">
    <form class="text-center border border-light p-5" action="" method="post">
        <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="text" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <div class="form-group">
            <label for="repass">Repeat Password</label>
            <input id="repass" type="password" class="form-control" placeholder="Repeat-Password" name="repass"
                value="">
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</section>`

export function registerPage(ctx) {
    ctx.render(registerTemplate());
}
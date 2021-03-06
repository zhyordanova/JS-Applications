import { html } from '../lib.js';
import { createGame, editGame, getGameById } from '../api/data.js';

const editTemplate = (editedGame, onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" .value=${editedGame.title}>

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" .value=${editedGame.category}>

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${editedGame.maxLevel}>

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" .value=${editedGame.imageUrl}>

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary" .value=${editedGame.summary}></textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>`;


export async function editPage(ctx) {
    const game = await getGameById(ctx.params.id);

    ctx.render(editTemplate(game, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const editedGame = {
            title: formData.get('title').trim(),
            category: formData.get('category').trim(),
            maxLevel: formData.get('maxLevel').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            summary: formData.get('summary').trim(),
        };

        if (Object.values(editedGame).some(x => !x)) {
            return alert('All fields are required!');
        }

        await editGame(ctx.params.id, editedGame);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}
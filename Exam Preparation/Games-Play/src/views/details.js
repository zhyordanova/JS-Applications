import { html } from '../lib.js';
import { createComment, deleteGameById, getAllCommentsByGameId, getGameById } from '../api/data.js';
import { getUserData } from '../util.js';
import { commentCard } from './common.js';


const detailsTemplate = (game, isOwner, onDelete, comments, onCommentSubmit) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">
            ${game.summary}
        </p>

        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length == 0 
                ? html`<p class="no-comment">No comments.</p>`
                : html`<ul>
                        ${comments.map(commentCard)}
                    </ul>`}
        </div>

        <div class="buttons">
            ${isOwner
                ? html`
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" href="#" class="button">Delete</a>`
                : null}
        </div>

        ${!isOwner
            ? commentForm(isOwner, getUserData(), onCommentSubmit)
            : null}
    </div>
</section>`;


const commentForm = (isOwner, isUser, onCommentSubmit) => html`
${!isOwner && isUser
? html`<article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onCommentSubmit} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>`
: null}`;


export async function detailsPage(ctx) {
    const [game, comments] = await Promise.all([
        getGameById(ctx.params.id),
        getAllCommentsByGameId(ctx.params.id)
    ]);

    const userData = getUserData();

    const isOwner = userData && userData.id == game._ownerId;

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this game?');

        if (confirmed) {
            await deleteGameById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onCommentSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const comment = formData.get('comment').trim();

        if (comment == '') {
            return alert('Cannot post empty comment!')
        }

        const body = {
            gameId: ctx.params.id,
            comment: comment
        }

        try {
            await createComment(body);
        } catch(err) {
            alert(err.message)
        }

        event.target.reset();
        ctx.page.redirect('/details/' + ctx.params.id)
    }

    ctx.render(detailsTemplate(game, isOwner, onDelete, comments, onCommentSubmit));
}
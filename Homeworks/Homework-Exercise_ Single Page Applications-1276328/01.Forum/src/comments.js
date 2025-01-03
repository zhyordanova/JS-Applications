import { e } from "./dom.js";
import { getPostById } from "./post.js";


const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';


export async function postComment(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const text = formData.get('postText');
    const username = formData.get('username');
    const id = ev.target.parentElement.dataset.id;
    const time = new Date();
    ev.target.reset();

    if (text == undefined || text.trim() == '' || username == undefined || username.trim() == '') {
        alert('All fields must be filled!');
        return;
    }
    try {
        const res = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, text, id, _onCreated: time })
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        getPostById(id);
    } catch (err) {
        alert(err.message);
    }

}

export async function showComments(section, id) {
    const data = await getComments();
    const comments = Object.values(data).filter(c => c.id == id);
    if (comments.length > 0) {
        comments.forEach(c => section.appendChild(displayComment(c)));
    }
}

function displayComment(comment) {
    const divEl = e('div', { id: 'user-comment' },
        e('div', { class: 'topic-name-wrapper' },
            e('div', { class: 'topic-name' },
                e('p', {},
                    e('strong', {}, `${comment.username}`), ' commented on ',
                    e('time', {}, `${new Date(comment._onCreated).toLocaleString()}`)
                ),
                e('div', { class: 'post-content' },
                    e('p', {}, `${comment.text}`)
                )
            )
        )
    )
   return divEl;
}

async function getComments() {
    try {
        const res = await fetch(url);

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        alert(err.message);
    }
}
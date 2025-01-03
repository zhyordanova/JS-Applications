import { e, showView } from "./dom.js";

const main = document.querySelector('main');
main.remove();

export function showHome() {
    showView(main);
    getPosts();
}
showHome();

const form = document.querySelector('form');
form.addEventListener('submit', createPost);

async function createPost(ev) {
    ev.preventDefault();

    const formData = new FormData(form);
    const topicName = formData.get('topicName').trim();
    const username = formData.get('username').trim();
    const text = formData.get('postText').trim();

    form.reset();
    if (topicName == undefined || topicName == '' || username == undefined || username == '' || text == undefined || text == '') {
       alert('All fields must be filled!');
        return;
    }

    try {
        let time = new Date();

        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, topicName, text, _onCreated: time })
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        await getPosts();
    } catch (e) {
        alert(e.message);
    }
}


async function getPosts() {
    const postList = document.querySelector('.topic-title');
    const resp = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const result = await resp.json();
    postList.replaceChildren(...Object.entries(result).map(displayPosts));

}

function displayPosts([id, post]) {
    let divEl = e('div', { class: 'topic-container' },
        e('div', { class: 'topic-name-wrapper' },
            e('div', { class: 'topic-name' },
                e('a', { href: '#', class: 'normal' },
                    e('h2', { 'data-id': `${id}` }, `${post.topicName}`)
                ),
                e('div', { class: 'columns' },
                    e('div', {},
                        e('p', {}, 'Date: ',
                            e('time', {}, `${post._onCreated}`)
                        ),
                        e('div', { class: 'nick-name' },
                            e('p', {}, 'Username: ',
                                e('span', {}, `${post.username}`)
                            )
                        )
                    )
                )
            )
        )
    )
    return divEl;
}

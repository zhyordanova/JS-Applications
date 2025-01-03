import { postComment, showComments} from "./comments.js";
import { e, showView } from "./dom.js";

export function showPost(ev) {
    const postId = ev.target.dataset.id;
    getPostById(postId);

}

export async function getPostById(id) {
    try {
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/');
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        const post = Object.values(data).filter(p => p._id == id);
        displayPost(post[0]);
        document.querySelector('form').addEventListener('submit', postComment);
        const commentList = document.querySelector('.comment');
        showComments(commentList, id);
    } catch (err) {
        alert(err.message);
    }
}

function displayPost(postData) {
    const time = (postData._onCreated.toString()).slice(0, 19);
    const section = e('div', { class: 'theme-content' },
        e('div', { class: 'theme-title' },
            e('div', { class: 'theme-name-wrapper' },
                e('div', { class: 'theme-name' },
                    e('h2', {}, `${postData.topicName}`)
                )
            )
        ),
        e('div', { id : 'commentList', class: 'comment' },
            e('div', { class: 'header' },
                e('img', { src: "./static/profile.png", alt: 'avatar' }),
                e('p', {},
                    e('span', {}, `${postData.username}`), ' posted on ',
                    e('time', {}, `${time.replace('T', ' ')}`)
                ),
                e('p', {}, `${postData.text}`)
            )
        ),
        e('div', { class: 'answer-comment' },
            e('p', {},
                e('span', {}, 'currentUser'), 'comment:'
            ),
            e('div', { class: 'answer', 'data-id': `${postData._id}`},
                e('form', {},
                    e('textarea', { name: 'postText', id: 'comment', cols: '30', rows: '10' }),
                    e('div', {},
                        e('label', { for: 'username' }, 'Username',
                            e('span', { class: 'red' }, '*')
                        ),
                        e('input', { type: 'text', name: 'username', id: 'username' })
                    ),
                    e('button', {}, 'Post')
                )
            )
        )
    );

    showView(section);
   
}






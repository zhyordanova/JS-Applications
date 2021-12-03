import { onUntil } from './delayed.js';
import { render } from './lit.js';
import articleTeplate from './templates/article.js';

start();

async function start() {
    const data = await (await fetch('./data.json')).json();

    const main = document.querySelector('main');

    const content = document.querySelector('#content');
    const renderBtn = document.getElementById('renderBtn');
    renderBtn.addEventListener('click', onRender);

    document.getElementById('changeBtn').addEventListener('click', onChange);
    document.getElementById('untilBtn').addEventListener('click', onUntil);

    // const result = html `<h1>Hello World<h1>`;
    // console.log(result);
    /*Object { "_$litType$": 1, strings: (1) […], values: [] }
    "_$litType$": 1
    strings: Array [ "<h1>Hello World<h1>" ]
    values: Array []
    <prototype>: Object { … }*/

    // const result = html`
    // <article>
    //     <h3>${data[0].title}</h3>
    //     <div class="content body">
    //         <p>${data[0].content}</p>
    //     </div>
    //     <footer>Author: ${data[0].author}</footer>
    //     <div class="comment">
    //         <p>Comment: </p>
    //     </div>
    // </article>`;

    // const result = data.map(articleTeplate);

    // render(result, main);


    function onRender() {
        const result = data.map(a => articleTeplate(onSubmit.bind(null, a), a));

        render(result, main);
    }

    function onChange() {
        data.shift();

        data.unshift({
            "title": "First Article 123456",
            "content": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, laborum dolor assumenda aut omnis nihil, quos dolore praesentium, suscipit amet nemo error adipisci totam! Ad perferendis cum necessitatibus fugiat obcaecati.",
            "author": "Graham Smith",
            "comments": [],
            "isOwner": true
        });

        onRender();
    }

    function onSubmit(article, event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const content = formData.get('comment');

        article.comments.push({ content });

        onRender();
    }
}



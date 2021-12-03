import { html, until, render } from "./lit.js";


const asyncTemplate = (dataPromise) => html`
<div>
    ${until(dataPromise, html`<span>Loading&hellip;</span>`)}
</div>`

const articleTemplate = (data) => html`
<article>
    <p>
        ${data.content}
    </p>
</article>`;

export function onUntil() {
    const content = document.querySelector('#content');

    render(asyncTemplate(resolveTemplate(getData())), content);
}

async function resolveTemplate(dataPromise) {
    const data = await dataPromise;

    return articleTemplate(data);
}

async function getData() {
    const data = { content: 'Async data' }

    return new Promise(res => {
        setTimeout(() => res(data), 2000);
    })
}
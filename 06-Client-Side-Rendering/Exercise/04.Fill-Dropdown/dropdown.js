import { html, render } from './node_modules/lit-html/lit-html.js';

const selectTemaplate = (items) => html`
<select id="menu">
    ${items.map(i => html`<option value=${i._id}>${i.text}</option>`)}
</select>`

// start:
// - add event listeners
// - call getData

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

const root = document.querySelector('div');

document.querySelector('form').addEventListener('submit', addItem);

getData();

// getData:
// - fetch and parse data
// - call update

async function getData() {
    const res = await fetch(url);
    const data = await res.json();

    update(Object.values(data));
}

// update:
// - render template

function update(items) {
    const result = selectTemaplate(items);
    render(result, root);
}

// add item:
// - read input
// - make POST request
// - on success, call getData

async function addItem(event) {
    event.preventDefault();
    const text = document.getElementById('itemText').value;

    const item = {
        text
    };

    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });

    if (res.ok) {
        getData();
        document.querySelector('form').reset();
    }
}



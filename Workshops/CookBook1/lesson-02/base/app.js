window.addEventListener('DOMContentLoad', start);

async function start() {
    const recipes = await getReceipes();
}


async function getReceipes() {
    const res = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
    const data = await res.json();

    return data;
}

async function getReceipeById(id) {
    const res = await fetch('http://localhost:3030/jsonstore/cookbook/details/' + id);
    const data = await res.json();

    return data;
}

function createPreview(recipe) {
    const element = document.createElement('article');
    element.className = 'preview';
    element.innerHTML = `<div class="title">
    <h2>${recipe.name}</h2>
</div>
<div class="small">
    <img src="${recipe.img}">
</div>`

    return element;

}
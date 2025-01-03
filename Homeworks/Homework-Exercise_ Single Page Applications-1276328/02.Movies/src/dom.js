const container = document.querySelector('main');

export function showView(el){
    container.replaceChildren(el);
}

export function e(type, attr, ...content) {
    let element = document.createElement(type);

    for (const prop in attr) {
       element.setAttribute(`${prop}`, attr[prop]);
    }

    for (let item of content) {
        if (typeof item == 'number' || typeof item == 'string') {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }
    return element;
}
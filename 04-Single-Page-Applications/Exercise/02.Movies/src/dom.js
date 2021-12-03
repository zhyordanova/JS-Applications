const main = document.querySelector('main');

export function showView(section) {
    main.replaceChildren(section);
}


export function e(tagName, attributes, ...content) {
    const result = document.createElement(tagName);

    //add attribute or event listener
    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? cur : [cur]), []);

    // add content or append a child element
    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result
}
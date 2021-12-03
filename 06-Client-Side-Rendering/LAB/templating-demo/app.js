import { renderTemplate } from "./engine.js";

// async function start() {
//     const data = await (await fetch('./data.json')).json();
//     const template = await(await fetch('./article.html')).text();

//     // const result = renderTemplate(template, data[0]);
//     // console.log(result);

//     /*<article>
//         <h3>Fisrst Article</h3>
//         <div class="content body">
//             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, laborum dolor assumenda aut omnis nihil, quos dolore praesentium, suscipit amet nemo error adipisci totam! Ad perferendis cum necessitatibus fugiat obcaecati.</p>
//         </div>
//         <footer>Author: John Smith</footer>
//     </article>*/

//     const main = document.querySelector('main');

//     main.innerHTML = data.map(a => renderTemplate(template, a)).join(''); 
// }

async function start() {
    const data = await (await fetch('./data.json')).json();
    const templateAsString = await(await fetch('./article.html')).text();

    const main = document.querySelector('main');

    const template = renderTemplate(templateAsString);

    main.innerHTML = data.map(template).join('');    
}

start();
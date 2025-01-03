async function solution() {

    let url = `http://localhost:3030/jsonstore/advanced/articles/list`;
    let main = document.getElementById(`main`);
    main.innerHTML = ``;

    let data = await fetch(url);
    let res = await data.json();

    for (const i of res) {

        let detailsUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${i[`_id`]}`;

        let extra = await fetch(detailsUrl);
        let content = await extra.json();

        let accordion = document.createElement(`div`);
        accordion.classList.add(`accordion`)
        accordion.innerHTML =
            `<div class="head">
            <span>${i[`title`]}</span>
            <button class="button" id="${i[`_id`]}">More</button>
            </div>
            <div class="extra">
                <p>${content[`content`]}</p>
            </div>`;

        let showBtn = accordion.querySelector(`button`);

        showBtn.addEventListener(`click`, (ev) => {

            let article = ev.target.parentNode.parentNode;

            if (ev.target.textContent == `More`) {

                article.children[1].classList.remove(`extra`);
                ev.target.textContent = `less`;

            }
            else {

                ev.target.textContent = `More`;
                article.children[1].classList.add(`extra`);
            }
        })
        main.appendChild(accordion);
    }
}

solution();
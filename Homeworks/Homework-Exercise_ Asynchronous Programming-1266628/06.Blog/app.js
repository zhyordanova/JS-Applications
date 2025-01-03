async function attachEvents() {

    let posts = document.getElementById(`posts`);
    let loadBtn = document.getElementById(`btnLoadPosts`);
    let viewBtn = document.getElementById(`btnViewPost`);

    let postsUrl = `http://localhost:3030/jsonstore/blog/posts`;

    let postsData = await fetch(postsUrl);
    let postsRes = await postsData.json();

    loadBtn.addEventListener(`click`, () => {

        posts.innerHTML = ``;
        for (const key in postsRes) {

            let option = document.createElement(`option`);
            option.value = key;
            option.textContent = postsRes[key][`title`];
    
            posts.appendChild(option);
        }
    })

    viewBtn.addEventListener(`click`, async () => {

        let postTitle = document.getElementById(`post-title`);
        let postBody = document.getElementById(`post-body`);
        let postComments = document.getElementById(`post-comments`);
        postComments.replaceChildren();
        
        let postId = posts.options[posts.selectedIndex].value;
        let post = `http://localhost:3030/jsonstore/blog/posts/${postId}`

        let data = await fetch(post);
        let res = await data.json();

        postBody.textContent = res[`body`];
        postTitle.textContent = res[`title`];

        let commentsUrl = `http://localhost:3030/jsonstore/blog/comments`;

        let comData = await fetch(commentsUrl);
        let comRes = await comData.json();

        Object.entries(comRes).forEach(el => {
            
            if (el[1][`postId`] == postId) {
                
                let li = document.createElement(`li`);
                li.id = el[0];
                li.textContent = el[1][`text`];

                postComments.appendChild(li);
            }
        });
    })
}

attachEvents();
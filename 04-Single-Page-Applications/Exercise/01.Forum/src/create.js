function onload() {
    let mainDiv1 = document.getElementsByClassName("topic-title")[0]
    console.log(mainDiv1)

    topicName = sessionStorage.getItem('topicName')
    time = sessionStorage.getItem('time')
    sub = sessionStorage.getItem('sub')

    let element = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <h2>${topicName}</h2>
            <p>Date: <time>${time}</time></p>
        </div>
        <div class="subscribers">
            <p>Subscribers: <span>${sub}</span></p>
        </div>
    </div>`

    if (name != 'Angular 10') {
        allDivs = [...document.querySelectorAll("div [class='comment']")].forEach(d => d.style.display = 'none')
    }

    mainDiv1.innerHTML = ''
    mainDiv1.innerHTML = element

}
onload()


function start() {
    document.getElementById('post').addEventListener('submit', newPost)
    document.getElementById('home').addEventListener('click', e => {
        window.location.pathname = '/index.html'
    })
}
start()
async function newPost(ev) {
    ev.preventDefault()

    let data = sessionStorage.getItem('art');
    console.log(data);

    function currentTime() {
        let d = new Date();
        let result = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        return result;
    }


    const formData = new FormData(ev.target);
    const newPost = {
        postText: formData.get('postText'),
        username: formData.get('username'),
        time: currentTime()
    }
    if (newPost.postText == "" || newPost.username == "") {
        return alert("All fields are required!");
    }

    const response = await fetch("http://localhost:3030/jsonstore/collections/myboard/comments", {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
    });
    if (response.ok) {
        const post = await response.json();
        ev.target.reset()
        displayTopic(post)
    } else {
        const error = await response.json();
        alert(error.message);
    }
}

async function displayTopic(post) {


    const commentsHtml = `
    <header class="header">
        <p><span>${post.username}</span> posted on <time>${post.time}</time></p>
    </header>
    <div class="comment-main">
        <div class="userdetails">
            <img src="./static/profile.png" alt="avatar">
        </div>
        <div class="post-content">
            <p>${post.postText}</p>
        </div>
    </div>
    <div class="footer">
        <p><span>0</span> likes</p>
    </div>
    `
    let mainDiv = document.getElementById('comments')

    const div = document.createElement('div')
    div.setAttribute("class", "comment");
    div.innerHTML = commentsHtml

    const lastElement = document.getElementsByClassName("answer-comment")[0]
    mainDiv.insertBefore(div, lastElement)
}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}
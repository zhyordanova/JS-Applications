const main = document.querySelector("main");

function start() {

  document.getElementById("topic").addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName == "H2") {
      let artName = event.target.textContent
      let parentDiv = event.target.parentNode.parentNode

      let [time, name, subscribe] = [...parentDiv.querySelectorAll('p')]

      time = time.lastChild.textContent
      let sub = subscribe.lastChild.textContent

      sessionStorage.setItem('name', artName)
      sessionStorage.setItem('time', time)
      sessionStorage.setItem('sub', sub)
      console.log(event.target)
      window.location.pathname = "topic-content.html"

    }
  });

  [...document.getElementsByTagName("button")][0].addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      window.location.pathname = "index.html";
    }
  );
  document.getElementById("createArt").addEventListener("submit", createArt);

}
start()


async function createArt(event) {
  event.preventDefault();

  const d = new Date();

  const formData = new FormData(event.target);
  const newArt = {
    topicName: formData.get("topicName"),
    username: formData.get("username"),
    postText: formData.get("postText"),
    time: d.toISOString(),
  };
  if (
    newArt.topicName == "" ||
    newArt.username == "" ||
    newArt.postText == ""
  ) {
    return alert("All fields are required!");
  }
  const url = "http://localhost:3030/jsonstore/collections/myboard/posts";
  const response = await fetch(url, {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newArt),
  });
  if (response.ok) {
    const art = await response.json();
    event.target.reset();
    ShowArt(art);
  } else {
    const error = await response.json();
    alert(error.message);
  }
}

function ShowArt(art) {
  const element = e(
    "div",
    { className: "topic-container" },
    e(
      "div",
      { className: "topic-name-wrapper" },
      e(
        "div",
        { className: "topic-name" },
        e(
          "a",
          { href: "#", className: "normal" },
          e("h2", {}, `${art.topicName}`),
          e(
            "div",
            { className: "columns" },
            e(
              "div",
              {},
              e("p", {}, "Data ", e("time", {}, `${art.time}`)),
              e(
                "div",
                { className: "nick-name" },
                e("p", {}, "Username: ", e("span", {}, `${art.username}`))
              )
            ),
            e(
              "div",
              { className: "subscribers" },
              e("p", {}, "Subscribers: ", e("span", {}, "0"))
            )
          )
        )
      )
    )
  );
  console.log(element);

  document.getElementById("topic").appendChild(element);
  //window.location.pathname = "01.Forum/index.html"
}

// document.getElementById('home').addEventListener('click',
// (event)=>{
//     window.location.pathname = '01.Forum/index.html'
// })

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
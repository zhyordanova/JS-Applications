import{showPost} from "./post.js";
import {showHome} from "./home.js";


document.getElementById('homeLink').addEventListener('click', showHome);

document.querySelector('.topic-title').addEventListener('click', showPost);


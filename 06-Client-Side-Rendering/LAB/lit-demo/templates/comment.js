import { html } from '../lit.js';

const commentTemplate = (comment) => html`<li>${comment.content}</li>`;

export default commentTemplate;
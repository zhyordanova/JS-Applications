import { getAllTopics } from '../api/data.js';
import { spinner } from '../common/spinner.js';
import { html, until } from '../lib.js';

const topicsTemplate = (topicPromise) => html`
<h1>
    Topics
</h1>
<div>

    ${until(topicPromise, spinner())}

</div>`;

const topicPreviewCard = (topic) => html`
<article class="preview drop">
    <header>
        <a href=${`/topic/${topic._id}`}>
            ${topic.title}
        </a>
    </header>
    <div>
        <span>
            <span>By ${topic.author.username}</span> | <span>15 Comments</span>
        </span>
    </div>
</article>`;

export function topicsPage(ctx) {
    ctx.render(topicsTemplate(loadTopics()));
}

async function loadTopics() {
    const topics = await getAllTopics();

    return topics.map(topicPreviewCard);
}
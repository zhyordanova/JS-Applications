function loadCommits() {

    const comitsList = document.getElementById('commits');
    comitsList.innerHTML = '';
    const username = document.getElementById('username').value;
    const repository = document.getElementById('repo').value;
    const url = `https://api.github.com/repos/${username}/${repository}/commits`

    fetch(url)
        .then(res => {
            if (res.ok == false) {
                throw new Error(`${res.status} (${res.statusText})`);
            }

            return res.json();
        })
        .then(handleResponse)
        .catch(handleError);

    function handleResponse(commits) {
        
        commits.forEach(e => {
            const liElement = document.createElement('li');
            liElement.textContent = `${e.commit.author.name}: ${e.commit.message}`;
            comitsList.appendChild(liElement);
        })
    }

    function handleError(error) {
        comitsList.textContent = `Error: ${error.message}`
    }
}
const tbody = document.querySelector('tbody');
const createForm =  document.getElementById('createForm');
const editForm = document.getElementById('editForm');

document.getElementById('loadBooks').addEventListener('click', loadBooks);
createForm.addEventListener('submit', onCreateForm);
editForm.addEventListener('submit', onEditSubmitForm);
editForm.querySelector('[type="button"]').addEventListener('click', cancelEdit);
tbody.addEventListener('click', onTableClick);

loadBooks();

async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const response = await fetch(url, options);

    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}

async function loadBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');

    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replaceChildren(...result);
}

async function loadBookById(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    return book;
}

async function createBook(book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'POST',
        body: JSON.stringify(book)
    });

    return result;
}

async function updateBook(id, book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'PUT',
        body: JSON.stringify(book)
    });

    return result;
}

async function deleteBook(id) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'DELETE'
    });

    return result;
}

function createRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td data-id=${id}>
<button class="edit">Edit</button>
<button class="delete">Delete</button>
</td>`;

    return row;
}

async function onCreateForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const author = formData.get('author');
    const title = formData.get('title');

    const result = await createBook({ author, title });
    tbody.appendChild(createRow(result._id, result));
    event.target.reset();
}

async function onTableClick(event) {
    if (event.target.className == 'delete') {
        onDeleteBook(event.target);
    } else if (event.target.className == 'edit') {
        onEditBook(event.target);
    }
}

async function onDeleteBook(button) {
    const id = button.parentElement.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();
}

async function onEditBook(button) {
    const id = button.parentElement.dataset.id;
    const book = await loadBookById(id);

    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="id"]').value = id;
    editForm.querySelector('[name="author"]').value = book.author;
    editForm.querySelector('[name="title"]').value = book.title;
}

async function onEditSubmitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    const result = await updateBook(id, {author, title});

    event.target.reset();
 
    createForm.style.display = 'block';
    editForm.style.display = 'none';
 
    loadBooks();
}

async function cancelEdit(event) {
    createForm.style.display = 'block';
    editForm.style.display = 'none';
    editForm.reset();
}
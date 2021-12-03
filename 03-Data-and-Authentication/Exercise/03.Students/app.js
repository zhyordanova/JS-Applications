function attachEvents() {
    document.getElementById('form').addEventListener('submit', onSubmitStudent);
}

attachEvents();

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

async function loadStudents() {
    const students = await request('http://localhost:3030/jsonstore/collections/students');

    const rows = Object.entries(students).map(createRow).join('');
    document.querySelector('tbody'), innerHTML = rows;

    function createRow([id, students]) {
        const result = `
        <tr data-id="${students._id}">
        <td>${students.firstName}</td>
        <td>${students.lastName}</td>
        <td>${students.facultNumber}</td>
        <td>${students.grade}</td>
        </tr>`

        return result
    }
}

async function onSubmitStudent(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const student = {
        firstName = formData.get('firstName'),
    }

}

loadStudents();


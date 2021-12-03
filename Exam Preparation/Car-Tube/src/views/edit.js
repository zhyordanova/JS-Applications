import { html } from '../lib.js';
import { editCar, getCarById } from '../api/data.js';

const editTemaplate = (editedCar, onSubmit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${editedCar.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${editedCar.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${editedCar.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${editedCar.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${editedCar.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${editedCar.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;


export async function editPage(ctx) {
    const car = await getCarById(ctx.params.id);

    ctx.render(editTemaplate(car, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const editedCar = {
            brand: formData.get('brand').trim(),
            model: formData.get('model').trim(),
            description: formData.get('description').trim(),
            year: Number(formData.get('year').trim()),
            imageUrl: formData.get('imageUrl').trim(),
            price: Number(formData.get('price').trim())
        };

        if (Number.isNaN(editedCar.year) || Number.isNaN(editedCar.price)) {
            return alert('Year and Price must be positive numbers!');
        }

        if (Object.values(editedCar).some(x => !x)) {
            return alert('All fields are required!')
        }

        await editCar(ctx.params.id, editedCar);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}
import { html } from '../lib.js';
import { createCar } from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`;


export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const car = {
            brand: formData.get('brand').trim(),
            model: formData.get('model').trim(),
            description: formData.get('description').trim(),
            year: Number(formData.get('year').trim()),
            imageUrl: formData.get('imageUrl').trim(),
            price: Number(formData.get('price').trim())
        };

        if (Number.isNaN(car.year) || Number.isNaN(car.price)) {
            return alert('Year and Price must be positive numbers!');
        }

        if (Object.values(car).some(x => !x)) {
            return alert('All fields are required!');
        }

        await createCar(car);
        ctx.page.redirect('/cars');
    }
}
import { showCatalor } from './catalog.js';
import { showCreate } from './create.js';
import { showUpdate } from './update.js';
import { render } from './utility.js';


// maind module:
// init modules with dependencies
// - rendering
// - comunication between modules


const root = document.body;

const ctx = {
    update
};

update()

function update() {
    render([
        showCatalor(ctx),
        showCreate(ctx),
        showUpdate(ctx)
    ], root);
}








const { chromium, request } = require('playwright-chromium');
const { expect, assert } = require('chai');

const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling",
        "title": "Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author": "Svetlin Nakov",
        "title": "C# Fundamentals"
    }
};

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}


describe('E2E Tests', async function () {
    this.timeout(60000);

    let page, brower;

    before(async () => {
        // brower = await chromium.launch();
        brower = await chromium.launch({ headless: false, slowMo: 1200 });
    });

    after(async () => {
        await brower.close();
    });

    beforeEach(async () => {
        page = await brower.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    describe('Load Books', () => {

        it('load and display all books', async () => {
            await page.route('**/jsonstore/collections/books*', (route) => {
                route.fulfill(json(mockData));
            });

            await page.goto('http://localhost:5500');

            await page.screenshot({ path: 'page.png' });

            await page.click('text=Load All Books');

            await page.waitForSelector('text=Harry Potter');

            const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()));

            expect(rows[1]).to.contains('Harry Potter');
            expect(rows[1]).to.contains('Rowling');
            expect(rows[2]).to.contains('C# Fundamentals');
            expect(rows[2]).to.contains('Nakov');

        }).timeout(60000);
    })

    describe('Add Book', () => {

        it('can create book', async () => {
            await page.goto('http://localhost:5500');

            await page.fill('form#createForm >> input[name="title"]', 'TitleTest');

            await page.fill('form#createForm >> input[name="author"]', 'AuthorTest');

            const [request] = await Promise.all([
                page.waitForRequest(request => request.method() == 'POST'),
                page.click('form#createForm >> text=Submit')
            ]);

            const data = JSON.parse(request.postData());

            expect(data.title).to.equal('TitleTest');
            expect(data.author).to.equal('AuthorTest');

        }).timeout(60000);

        it('can not create book when there is an empty field', async () => {
            await page.goto('http://localhost:5500');
            await page.waitForSelector('input');

            let message;

            await page.fill('form#createForm >> input[name="title"]', 'TitleTest');
            await page.fill('form#createForm >> input[name="author"]', '');
            await checkInvalid();

            await page.fill('form#createForm >> input[name="title"]', '');
            await page.fill('form#createForm >> input[name="author"]', 'AuthorTest');
            await checkInvalid();

            async function checkInvalid() {
                page.on('dialog', async (dialog) => {
                    message = dialog.message();
                    await dialog.accept();
                });

                await page.click('form#createForm >> text=Submit');
                assert.equal(message, 'All fields are required!')
            }

        }).timeout(60000);
    })

    describe('Edit Tests', () => {

        it('load correct form', async () => {
            await page.route('**/jsonstore/collections/books*', (route) => {
                route.fulfill(json(mockData));
            });

            await page.goto('http://localhost:5500');

            await page.click('text=Load All Books');
            await page.waitForSelector('text=Harry Potter');
            await page.click('text=Edit');

            const editFormDisplay = await page.$eval(
                '#editForm',
                el => el.style.display
            );

            const createFormDisplay = await page.$eval(
                '#createForm',
                el => el.style.display
            );

            expect(editFormDisplay).to.equal('block');
            expect(createFormDisplay).to.equal('none');

        }).timeout(60000);

        it('load correct information to edit', async () => {
            await page.route('**/jsonstore/collections/books*', (route) => {
                route.fulfill(json(mockData));
            });

            await page.route('**/jsonstore/collections/books*', (route) => {
                route.fulfill(json({
                    title: 'title',
                    author: 'author'
                }));
            })

            await page.goto('http://localhost:5500');

            await page.click('text=Load All Books');
            await page.click('text=Edit');

            await page.fill('form#editForm >> input[name="title"]', 'EditTitleTest');

            await page.fill('form#editForm >> input[name="author"]', 'EditAuthorTest');

            const [response] = await Promise.all([
                page.waitForResponse(r => r.request().url().includes('/jsonstore/collections/books')),
                page.click('form#editForm >> text=Save')
            ]);

            const data = JSON.parse(await response.body());

            expect(data.title).to.equal('EditTitleTest');
            expect(data.author).to.equal('EditAuthorTest');

        }).timeout(60000);

        it('send editForm request', async () => {
            await page.route('**/jsonstore/collections/books*', (route) => {
                route.fulfill(json(mockData));
            });

            await page.route('**/jsonstore/collections/books*', (route) => {
                route.fulfill(json({
                    title: 'EditTitleTest',
                    author: 'EditAuthorTest'
                }))
            });

            await page.goto('http://localhost:5500');

            await page.click('text=Load All Books');
            await page.click('text=Edit');

            const [request] = await Promise.all([
                page.waitForRequest(request => request.method() == 'PUT'),
                page.click('form#editForm >> text=Save')
            ]);

            const data = JSON.parse(request.postData());

            expect(data.title).to.equal('EditTitleTest');
            expect(data.author).to.equal('EditAuthorTest');

        }).timeout(60000);

        it('do not send editForm request when there is an empty field', async () => {
            await page.route('**/jsonstore/collections/books*', (route) => {
                route.fulfill(json(mockData));
            });

            await page.route('**/jsonstore/collections/books*', (route) => {
                route.fulfill(json({
                    title: 'title',
                    author: 'author'
                }));
            })

            await page.goto('http://localhost:5500');

            await page.click('text=Load All Books');
            await page.click('text=Edit');

            await page.fill('form#editForm >> input[name="title"]', 'EditTitleTest');
            await page.fill('form#editForm >> input[name="author"]', '');
            await checkInvalid();

            await page.fill('form#editForm >> input[name="title"]', '');
            await page.fill('form#editForm >> input[name="author"]', 'EditAuthorTest');
            await checkInvalid();

            async function checkInvalid() {
                page.on('dialog', async (dialog) => {
                    message = dialog.message();
                    await dialog.accept();
                });

                await page.click('form#editForm >> text=Save');
                assert.equal(message, 'All fields are required!')
            }

        }).timeout(60000);
    })

    describe('Delete Book', () => {

        it('delete book', async () => {
            await page.goto('http://localhost:5500');

            await Promise.all([
                page.click('text=Load All Books'),
                page.click('text=Delete'),
                page.on('dialog', dialog => dialog.accept())
            ]);

            await page.click('text=Load All Books');

            const content = await page.textContent('table tbody');

            expect(content).not.to.contain('J.K.Rowling');
        }).timeout(60000);
    })
})

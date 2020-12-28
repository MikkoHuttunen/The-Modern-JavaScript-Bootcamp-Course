const { italic } = require("chalk");
const render = require("../../render");

const assert = require('assert');

it('has a text input', async () => {
    const dom = await render('index.html');
    const input = dom.window.document.querySelector('input');

    assert(input);
});

it('shows a success message with a valid email', async () => {
    const dom = await render('index.html');
    const input = dom.window.document.querySelector('input');
    input.value = 'test@email.com';
    dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));
    const h2 = dom.window.document.querySelector('h2');

    assert.strictEqual(h2.innerHTML, 'Valid email');
});

it('shows a fail message with a invalid email', async () => {
    const dom = await render('index.html');
    const input = dom.window.document.querySelector('input');
    input.value = 'testemail.com';
    dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));
    const h2 = dom.window.document.querySelector('h2');

    assert.strictEqual(h2.innerHTML, 'Invalid email');
});
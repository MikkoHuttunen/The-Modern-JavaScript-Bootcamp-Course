//Use JSDOM to test browser-based JS

//Implement modules
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

//jsdom html parsing
const render = async filename => {
    const filePath = path.join(process.cwd(), filename);
    const dom = await JSDOM.fromFile(filePath, {
        runScripts: 'dangerously',
        resources: 'usable'
    });

    return new Promise((resolve, reject) => {
        dom.window.document.addEventListener('DOMContentLoaded', () => {
            resolve(dom);
        });
    });
};

module.exports = render;
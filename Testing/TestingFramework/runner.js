//Get all test files and run tests

//Implement modules
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const render = require('./render');

//Exclude these folders from testing
const ignoreDirs = ['node_modules'];

class Runner {
    constructor() {
        this.testFiles = [];
    }

    //Run tests to all test files
    async runTests() {
        for (let file of this.testFiles) {
            console.log(chalk.grey(`---- ${file.shortName}`));
            const beforeEaches = [];
            //Implement render function
            global.render = render;
            //Implement beforeEach function
            global.beforeEach = (func) => {
                beforeEaches.push(func);
            };
            //Implement it function
            global.it = async (desc, func) => {
                beforeEaches.forEach(func => func());
                //Handle test errors
                try {
                    await func();
                    console.log(chalk.green(`\tOK - ${desc}`));
                } catch(err) {
                    const message = err.message.replace(/\n/g, '\n\t\t'); //Format error message
                    console.log(chalk.red(`\tX - ${desc}`));
                    console.log(chalk.red('\t', message));
                }
            };

            //Handle file errors
            try {
                require(file.name);
            } catch(err) {
                console.log(chalk.red('X - Error loading file', file.name));
                console.log(err);
            }
        }
    };

    //Iterate all project folders and collect files for testing
    async collectFiles(targetPath) {
        const files = await fs.promises.readdir(targetPath);

        for (let file of files) {
            //Join path and file to create exact filepath
            const filepath = path.join(targetPath, file);
            const stats = await fs.promises.lstat(filepath);

            //Check if file or directory
            if (stats.isFile() && file.includes('.test.js')) {
                //If file is a test file, add it to the test files
                this.testFiles.push({ name: filepath, shortName: file });
            } else if (stats.isDirectory() && !ignoreDirs.includes(file)) {
                //If it is directory, add all the contents to array
                const childFiles = await fs.promises.readdir(filepath);

                files.push(...childFiles.map(f => path.join(file, f)));
            }
        }
    };
};

module.exports = Runner;
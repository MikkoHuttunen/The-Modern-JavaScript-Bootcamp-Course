#!/usr/bin/env node

const Runner = require('./runner');
const runner = new Runner();

//Get all the files from the initialization folder and run tests
const run = async () => {
    await runner.collectFiles(process.cwd());
    runner.runTests();
};

run();
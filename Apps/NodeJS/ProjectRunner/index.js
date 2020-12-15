#!/usr/bin/env node

//Implement modules
const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');
const chalk = require('chalk');

//Set up command
program
    .version('0.0.1')
    .argument('[filename]', 'Name of a file to execute')
    .action(async ({ filename }) => {
        //Checks if given filename exits or default it to index.js
        const name = filename || 'index.js';

        try {
            await fs.promises.access(name);
        } catch (err) {
            throw new Error(`Could not find the file ${name}`);
        }

        let proc;

        //Inherit log information from child process and show it
        const start = debounce(() => {
            if (proc) {
                //Terminate previous child process when executing a new one
                proc.kill();
            }
            console.log(chalk.yellow('>>> Starting process'));
            proc = spawn('node', [name], { stdio: 'inherit' });
        }, 500);

        //Watch file changes of the project directory
        chokidar.watch('.')
            .on('add', start)
            .on('change', start)
            .on('unlink', start);
    });

program.parse(process.argv);
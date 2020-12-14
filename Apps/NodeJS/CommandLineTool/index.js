#!/usr/bin/env node

//Implement library modules
const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');

const { lstat } = fs.promises;
const targetDir = process.argv[2] || process.cwd(); //Allow passing arguments with command

//Get all files in directory and list its content
fs.readdir(targetDir, async(err, filenames) => {
    if (err) {
        console.log(err);
    }

    //Get path to directory and files
    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });

    const allStats = await Promise.all(statPromises);

    //Display files and folders of directory in different style
    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if (stats.isFile()) {
            console.log(filenames[index]);
        } else {
            console.log(chalk.bold(filenames[index]));
        }
    }
});
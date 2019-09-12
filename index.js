#!/usr/bin env node

"use strict";

const grab = require("./grab.js");
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

var args = require("minimist")(process.argv.slice(2), {
    boolean: ['help'],
    string: ['file']
});

if (args.help) {
    printHelp();
} else if (args.file) {
    let filepath = path.resolve(args.file);
    processFile(filepath);
} else {
    error("Incorrect usage", true)
}

// ***************
function error(msg, includeHelp = false) {
    console.log(msg)
    if (includeHelp) {
        console.log('');
        printHelp();
    }
}

function printHelp() {
    console.log('index usage:');
    console.log('   index --help');
    console.log('');
    console.log('   --help                         print this help');
    console.log('   --file                         specify the file (csv)');
    console.log('');
}

function processFile(filepath) {

    fs.readFile(filepath, function onContents(err, contents){
        if (err) {
            error(err.toString());
        } else {
            processCsv(filepath);
        }
    })
}

function processCsv(filepath) {
    csv()
    .fromFile(filepath)
    .then((jsonObj)=>{
        jsonObj.forEach(function (careerYear, i) {
            setTimeout(function(){
                grab(careerYear.name, careerYear.profession, careerYear.year);
                // console.log(el);
            }, 60000 * (i + 1));
        });
    })
}

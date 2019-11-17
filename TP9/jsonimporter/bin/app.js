#!/usr/bin/env node

//requires
const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const confirm = require('prompt-confirm');
const nodeCmd = require('node-cmd');

//configs
yargs.detectLocale(false);
const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "double",
    borderColor: "#f57242",
    backgroundColor: "#555555"
};

//options
const options = yargs
    .usage("Usage: --db <database_name> --cl <collection_name> --fn <filename>")
    .option("db", { alias: "database", describe: "Name of the database", demandOption: true })
    .option("cl", { alias: "collection", describe: "Name of the collection", demandOption: true })
    .option("fn", { alias: "filename", describe: "Your json file to import", demandOption: true })
    .argv;


//chalk options
db_color = chalk.red.bold(options.db);
cl_color = chalk.red.bold(options.cl);
fn_color = chalk.red.bold(options.fn);

//read input
var command = ``
    + `\n Database:    ${db_color}`
    + `\n Collection:  ${cl_color}`
    + `\n Filename :   ${fn_color}`;

comand = chalk.white.bold(command);
var msgBox = boxen(command, boxenOptions);
console.log(msgBox);

new confirm('Are these correct?')
    .run()
    .then((answer) => {
        if (answer) {
            nodeCmd.get(`mongoimport --db ${options.db} --collection ${options.cl} --file ${options.fn} --jsonArray`,
                (err, data, stderr) => {
                    if (stderr)
                        console.log(stderr);
                    else
                        console.log(data);
                }
            );
        }
    });
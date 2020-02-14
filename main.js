#!/usr/bin/env node

// * Lib imports
const files = require('./lib/files');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');
const argv = require('minimist')(process.argv.slice(2))._;

clear();

const run = async () => {
  let [std, custo, output, trash] = argv;
  delete trash;

  if (!(std && custo && output)) {
    console.log(chalk.yellow(figlet.textSync('Package-merger', { horizontalLayout: 'full' })));
    console.log();
  }

  inquirer.askFolders(std, custo, output).then(folders => {
    std = folders.std || std;
    custo = folders.custo || custo;
    output = folders.output || output;

    if (!files.exists(std + '/package.json')) {
      console.log(chalk.bgRed.black(`The file "package.json" does not exist in "${std}"...`));
      return;
    }
    if (!files.exists(custo + '/package.json')) {
      console.log(chalk.bgRed.black(`The file "package.json" does not exist in "${custo}"...`));
      return;
    }

    console.log(chalk.green(`Merging "${std}/package.json" and "${custo}/package.json"...`));
    console.log();

    const stdPackage = files.getPackageJSON(std);
    const custoPackage = files.getPackageJSON(custo);
    const mergePackage = files.mergePackageJSON(stdPackage, custoPackage);
    files.writePackageJSON(output, mergePackage);

    if (files.exists(output + '/package.json')) {
      console.log(chalk.bgGreen.black(`package.json successfully created...`));
    } else {
      console.log(chalk.bgRed.black(`An error occured...`));
      return;
    }
  });
};

run();

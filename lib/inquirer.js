const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
  askFolders: (...folders) => {
    const [std, custo, output] = folders;
    const questions = [];

    if (!std)
      questions.push({
        name: 'std',
        type: 'input',
        message: 'Standard Folder:',
        default: std,
        validate: function(value) {
          if (value.length) {
            if (files.exists(value)) {
              return true;
            } else {
              return 'Please enter a valid folder name';
            }
          } else {
            return 'Please enter a valid folder name';
          }
        }
      });

    if (!custo)
      questions.push({
        name: 'custo',
        type: 'input',
        message: 'Custom Folder:',
        default: custo,
        validate: function(value) {
          if (value.length) {
            if (files.exists(value)) {
              return true;
            } else {
              return 'Please enter a valid folder name';
            }
          } else {
            return 'Please enter a valid folder name';
          }
        }
      });

    if (!output)
      questions.push({
        name: 'output',
        type: 'input',
        message: 'Output Folder:',
        default: output,
        validate: function(value) {
          if (value.length) {
            if (files.exists(value)) {
              return true;
            } else {
              return 'Please enter a valid folder name';
            }
          } else {
            return 'Please enter a valid folder name';
          }
        }
      });

    return inquirer.prompt(questions);
  }
};

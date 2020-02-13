const fs = require('fs');
const path = require('path');
const lodash = require('lodash');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  exists: filePath => {
    return fs.existsSync(filePath);
  },

  getPackageJSON: filePath => {
    const content = fs.readFileSync(filePath + '/package.json', 'utf8');
    return JSON.parse(content);
  },

  /**
   * @param {any} std
   * @param {any} custo
   * Les packages du custo prime sur ceux du standard car le custo n'est pas forcément sur la même version que le standard
   */
  mergePackageJSON: (std, custo) => {
    const dependencies = lodash.cloneDeep(std.dependencies);
    lodash.assign(dependencies, custo.dependencies);
    custo.dependencies = dependencies;
    return custo;
  },

  writePackageJSON: (output, content) => {
    fs.writeFileSync(output + '/package.json', JSON.stringify(content, null, 2));
  }
};

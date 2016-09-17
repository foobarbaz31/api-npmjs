'use strict';

const lodash = require('lodash');

function formatData(data) {
  let returnData = {};
  returnData = lodash.pick(data, [
    'name',
    'description',
    'dist-tags',
    'maintainers',
    'time',
    'homepage',
    'keywords',
    'repository',
    'author',
    'licenses',
    'starred'
  ]);

  returnData.versions = [];

  lodash.keys(data.versions).forEach((item) => {
    let tempObj = {};
    tempObj = lodash.pick(data.versions[item], [
      'name',
      'version',
      'description',
      'main',
      'scripts',
      'repository',
      'keywords',
      'author',
      'bugs',
      'homepage',
      'devDependencies',
      'dependencies',
      'licenses',
      'maintainers'
    ]);
    returnData.versions.push(tempObj);
  });
  return returnData;
}

module.exports = {
  formatData
};

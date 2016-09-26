'use strict';

const Registry = require('npm-registry');

let registry;

module.exports = function getRegistry() {
  if (registry) {
    return registry;
  }

  registry = new Registry({ registry: 'https://registry.npmjs.org' });

  return registry;
};

'use strict';

const registry = require('./registry');

function fetchUserInfo(opts, callback) {
  const registryInstance = registry.getRegistry();
  registryInstance.users.get(opts.username, (err, data) => {
    if (err) {
      return callback(err);
    }
    if (data[0].error !== undefined) {
      const error = new Error(data[0].error);
      return callback(error);
    }
    return callback(null, data);
  });
}

function fetchUserPackageInfo(opts, callback) {
  const registryInstance = registry.getRegistry();
  registryInstance.users.list(opts.username, (err, data) => {
    if (err) {
      return callback(err);
    }
    if (data[0].error !== undefined) {
      const error = new Error(data[0].error);
      return callback(error);
    }
    return callback(null, data);
  });
}

module.exports = {
  fetchUserInfo,
  fetchUserPackageInfo
};

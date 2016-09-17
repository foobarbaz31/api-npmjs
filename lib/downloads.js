const registry = require('./registry');
const helpers = require('../helpers/dateTimeHelpers');
/**
 * fetchTotalDownloads
 * @param {Object} opts - Object containing other params
 * @param {string} opts.package - Package to fetch downloads for
 * @param {string} opts.start - Start date
 * @param {string} opts.end - End date
 */
function fetchTotalDownloads(opts, callback) {
  const start = helpers.formatDate(opts.start);
  const end = helpers.formatDate(opts.end);

  const registryInstance = registry.getRegistry();
  registryInstance.downloads.totals(`${start}:${end}`, opts.package, (err, data) => {
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

function fetchRangeDownloads(opts, callback) {
  const start = helpers.formatDate(opts.start);
  const end = helpers.formatDate(opts.end);

  const registryInstance = registry.getRegistry();
  registryInstance.downloads.range(`${start}:${end}`, opts.package, (err, data) => {
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
  fetchTotalDownloads,
  fetchRangeDownloads
};

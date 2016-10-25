/* eslint-disable no-var */

const registry = require('./registry');
const helpers = require('../helpers/dateTimeHelpers');
const async = require('async');
const lodash = require('lodash');

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
  var pointDownloads = 0;

  const chunks = helpers.dateChunks(start, end, 'months');
  const jobs = chunks.map(chunk =>
    function points(cb) {
      return registryInstance.downloads.totals(`${chunk.start}:${chunk.end}`, opts.package, cb);
    });

  async.parallel(jobs, (err, result) => {
    if (err) {
      return callback(err);
    }
    const flattenedResult = lodash.flatten(result);
    const checkError = lodash.find(flattenedResult, 'error');
    if (checkError) {
      return callback(new Error(checkError.error));
    }

    const downloads = lodash.map(flattenedResult, 'downloads');

    lodash.forEach(downloads, (item) => {
      pointDownloads += item;
    });
    const finalResult = [{
      downloads: pointDownloads,
      start,
      end,
      package: opts.package
    }];
    return callback(err, finalResult);
  });
}

function fetchRangeDownloads(opts, callback) {
  const start = helpers.formatDate(opts.start);
  const end = helpers.formatDate(opts.end);
  const chunks = helpers.dateChunks(start, end, 'months');
  const registryInstance = registry.getRegistry();

  const jobs = chunks.map(chunk =>
    function ranges(cb) {
      return registryInstance.downloads.range(`${chunk.start}:${chunk.end}`, opts.package, cb);
    });

  async.parallel(jobs, (err, result) => {
    if (err) {
      return callback(err);
    }
    const flattenedResult = lodash.flatten(result);
    const checkError = lodash.find(flattenedResult, 'error');
    if (checkError) {
      return callback(new Error(checkError.error));
    }

    const downloads = lodash.flatten(lodash.map(flattenedResult, 'downloads'));

    const finalResult = [{
      downloads,
      start,
      end,
      package: opts.package
    }];
    return callback(err, finalResult);
  });
}

module.exports = {
  fetchTotalDownloads,
  fetchRangeDownloads
};

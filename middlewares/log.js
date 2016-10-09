'use strict';

const bunyan = require('bunyan');
const bunyanMiddleware = require('bunyan-middleware');

/**
 * bunyanMiddleware
 * @params None
 * @return express middleware function for logging
 */
module.exports = function logMiddleware() {
  const logger = bunyan.createLogger({
    name: 'apinpmstats',
    stream: process.stdout
  });

  return bunyanMiddleware({
    logger
  });
};


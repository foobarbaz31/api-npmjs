'use strict';

const bunyan = require('bunyan');
const bunyanMiddleware = require('bunyan-middleware');
const config = require('config');
/**
 * bunyanMiddleware
 * @params None
 * @return express middleware function for logging
 */
module.exports = function logMiddleware() {
  const logger = bunyan.createLogger({
    name: config.appName,
  });

  return bunyanMiddleware(({
    logger
  }));
};


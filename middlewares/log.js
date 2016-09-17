'use strict';

const bunyanMiddleware = require('express-bunyan-logger');

/**
 * bunyanMiddleware
 * @params None
 * @return express middleware function for logging
 */
module.exports = function logMiddleware() {
  const config = {
    name: 'logger',
    immediate: false,
    streams: [{
      level: 'trace',
      path: '/var/log/stat.log',
      period: '1d',
      type: 'rotating-file'
    }]
  };
  return bunyanMiddleware(config);
};


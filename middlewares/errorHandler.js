'use strict';

/* eslint no-unused-vars:0 */
const boom = require('boom');

module.exports = function errorHandler(err, req, res, next) {
  let error;
  if (res.statusCode === 400) {
    error = boom.badRequest(err);
  } else if (res.statusCode === 404) {
    error = boom.notFound(err);
  } else {
    res.statusCode = 500;
    error = boom.wrap(new Error(err), 500);
  }
  res.json(error.output.payload);
};

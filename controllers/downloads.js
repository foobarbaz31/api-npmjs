'use strict';

const downloads = require('../lib/downloads');

function getPointDownloads(req, res, next) {
  const opts = {
    package: req.swagger.params.package.value,
    start: req.swagger.params.start.value,
    end: req.swagger.params.end.value
  };

  if (opts.start > opts.end) {
    res.statusCode = 400;
    next(new Error('start date cannot be greater than end date'));
    return;
  }

  downloads.fetchTotalDownloads(opts, (err, data) => {
    if (err) {
      res.statusCode = 404;
      next(new Error(err));
      return;
    }
    res.statusCode = 200;
    res.json(data);
  });
}

function getRangeDownloads(req, res, next) {
  const opts = {
    package: req.swagger.params.package.value,
    start: req.swagger.params.start.value,
    end: req.swagger.params.end.value
  };

  if (opts.start > opts.end) {
    res.statusCode = 400;
    next(new Error('start date cannot be greater than end date'));
  }

  downloads.fetchRangeDownloads(opts, (err, data) => {
    if (err) {
      res.statusCode = 404;
      next(new Error(err));
      return;
    }
    res.statusCode = 200;
    res.json(data);
  });
}

module.exports = {
  getPointDownloads,
  getRangeDownloads
};

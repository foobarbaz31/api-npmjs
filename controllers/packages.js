'use strict';

const packages = require('../lib/packages');

function getPackageInfo(req, res, next) {
  const opts = {
    package: req.swagger.params.package.value
  };

  packages.fetchPackageInfo(opts, (err, data) => {
    if (err) {
      res.statusCode = 404;
      next(new Error(err));
      return;
    }
    res.statusCode = 200;
    res.json(data);
  });
}

function getPackageDepended(req, res, next) {
  const opts = {
    package: req.swagger.params.package.value
  };

  packages.fetchPackageDepended(opts, (err, data) => {
    if (err) {
      res.statusCode = 404;
      next(new Error(err));
      return;
    }
    res.statusCode = 200;
    res.json(data);
  });
}

function getPackageStarred(req, res, next) {
  const opts = {
    package: req.swagger.params.package.value
  };

  packages.fetchPackageStarred(opts, (err, data) => {
    if (err) {
      res.statusCode = 404;
      next(new Error(err));
      return;
    }
    res.statusCode = 200;
    res.json(data);
  });
}

function getPackageKeyword(req, res, next) {
  const opts = {
    package: req.swagger.params.package.value
  };

  packages.fetchPackageKeyword(opts, (err, data) => {
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
  getPackageInfo,
  getPackageDepended,
  getPackageStarred,
  getPackageKeyword
};

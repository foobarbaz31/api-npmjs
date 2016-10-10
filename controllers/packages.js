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
    }
    res.statusCode = 200;
    res.json(data);
  });
}

module.exports = {
  getPackageInfo
};

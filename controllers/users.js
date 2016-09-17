'use strict';

const users = require('../lib/users');

function getUserInfo(req, res, next) {
  const opts = {
    username: req.swagger.params.username.value
  };

  users.fetchUserInfo(opts, (err, data) => {
    if (err) {
      res.statusCode = 404;
      next(new Error(err));
      return;
    }
    res.statusCode = 200;
    res.json(data);
  });
}

function getUserPackageList(req, res, next) {
  const opts = {
    username: req.swagger.params.username.value
  };

  users.fetchUserPackageInfo(opts, (err, data) => {
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
  getUserInfo,
  getUserPackageList
};

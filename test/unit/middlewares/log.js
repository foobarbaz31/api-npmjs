'use strict';

const expect = require('chai').expect;
const log = require('../../../middlewares/log');

describe('#log', () => {
  it('should return bunyan middlewares function', () => {
    const instance = log;
    expect(instance).to.be.a.function;
  });
});

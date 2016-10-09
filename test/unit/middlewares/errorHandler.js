'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const errorHandler = require('../../../middlewares/errorHandler');

describe('#errorHandler', () => {
  it('should boomify 400 error', () => {
    const res = {
      statusCode: 400,
      json: err => err
    };
    const resJsonSpy = sinon.spy(res, 'json');
    const err = new Error('bad error');
    errorHandler(err, undefined, res, undefined);
    expect(resJsonSpy.callCount).to.be.equal(1);
    expect(resJsonSpy.calledWith({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Error: bad error'
    })).to.be.equal(true);
  });

  it('should boomify 404 error', () => {
    const res = {
      statusCode: 404,
      json: err => err
    };
    const resJsonSpy = sinon.spy(res, 'json');
    const err = new Error('bad error');
    errorHandler(err, undefined, res, undefined);
    expect(resJsonSpy.callCount).to.be.equal(1);
    expect(resJsonSpy.calledWith({
      statusCode: 404,
      error: 'Not Found',
      message: 'Error: bad error'
    })).to.be.equal(true);
  });

  it('should boomify 500 error', () => {
    const res = {
      statusCode: 500,
      json: err => err
    };
    const resJsonSpy = sinon.spy(res, 'json');
    const err = new Error('bad error');
    errorHandler(err, undefined, res, undefined);
    expect(resJsonSpy.callCount).to.be.equal(1);
    expect(resJsonSpy.calledWith({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An internal server error occurred'
    })).to.be.equal(true);
  });
});

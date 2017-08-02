'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const errorHandler = require('../../../middlewares/errorHandler');

describe('#errorHandler', () => {
  const req = {
    log: {
      error: err => err
    }
  };

  it('should boomify 400 error', () => {
    const res = {
      statusCode: 400,
      json: err => err
    };
    const resJsonSpy = sinon.spy(res, 'json');
    const err = new Error('bad error');
    errorHandler(err, req, res, undefined);
    expect(resJsonSpy.callCount).to.be.equal(1);
    expect(resJsonSpy.getCall(0).args[0]).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message: 'bad error'
    });
  });

  it('should boomify 404 error', () => {
    const res = {
      statusCode: 404,
      json: err => err
    };
    const resJsonSpy = sinon.spy(res, 'json');
    const err = new Error('bad error');
    errorHandler(err, req, res, undefined);
    expect(resJsonSpy.callCount).to.be.equal(1);
    expect(resJsonSpy.getCall(0).args[0]).to.deep.equal({
      statusCode: 404,
      error: 'Not Found',
      message: 'bad error'
    });
  });

  it('should boomify 500 error', () => {
    const res = {
      statusCode: 500,
      json: err => err
    };
    const resJsonSpy = sinon.spy(res, 'json');
    const err = new Error('bad error');
    errorHandler(err, req, res, undefined);
    expect(resJsonSpy.callCount).to.be.equal(1);
    expect(resJsonSpy.getCall(0).args[0]).to.deep.equal({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An internal server error occurred'
    });
  });
});

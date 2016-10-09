'use strict';

/* eslint-disable arrow-body-style */

const expect = require('chai').expect;
const download = require('../../../lib/downloads');
const registry = require('../../../lib/registry');
const sinon = require('sinon');

describe('#downloads', () => {
  let sandbox;

  describe('#fetchTotalDownloads', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('#should return error message if registry returns an error', (done) => {
      const opts = {
        start: '2016-02-01',
        end: '2016-02-02',
        package: 'express'
      };

      const stubFunction = function stubFunction(range, name, func) {
        const err = new Error('Some Error');
        return func(err);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          downloads: {
            totals: stubFunction
          }
        };
      });

      download.fetchTotalDownloads(opts, (err) => {
        expect(err.message).to.equal('Some Error');
        done();
      });
    });

    it('#should return data if registry returns data', (done) => {
      const opts = {
        start: '2016-02-01',
        end: '2016-02-02',
        package: 'express'
      };

      const stubFunction = function stubFunction(range, name, func) {
        const data = [{ foo: 'bar' }];
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          downloads: {
            totals: stubFunction
          }
        };
      });

      download.fetchTotalDownloads(opts, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.deep.equal([{ foo: 'bar' }]);
        done();
      });
    });

    it('#should return data if registry returns error inside data object', (done) => {
      const opts = {
        start: '2016-02-01',
        end: '2016-02-02',
        package: 'express'
      };

      const stubFunction = function stubFunction(range, name, func) {
        const data = [{ error: 'bar' }];
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          downloads: {
            totals: stubFunction
          }
        };
      });

      download.fetchTotalDownloads(opts, (err) => {
        expect(err.message).to.equal('bar');
        done();
      });
    });
  });
});

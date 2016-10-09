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

      const data = [{
        downloads: 6,
        start: '2016-09-20',
        end: '2016-09-25',
        package: 'profanity-cleanser'
      }];

      const stubFunction = function stubFunction(range, name, func) {
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          downloads: {
            totals: stubFunction
          }
        };
      });

      download.fetchTotalDownloads(opts, (err, item) => {
        expect(err).to.be.null;
        expect(item).to.deep.equal(data);
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

  describe('#fetchRangeDownloads', () => {
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
            range: stubFunction
          }
        };
      });

      download.fetchRangeDownloads(opts, (err) => {
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

      const data = [{
        downloads: [
          {
            day: '2016-09-24',
            downloads: 2
          }
        ],
        start: '2016-09-24',
        end: '2016-09-25',
        package: 'profanity-cleanser'
      }];

      const stubFunction = function stubFunction(range, name, func) {
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          downloads: {
            totals: stubFunction
          }
        };
      });

      download.fetchTotalDownloads(opts, (err, item) => {
        expect(err).to.be.null;
        expect(item).to.deep.equal(data);
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

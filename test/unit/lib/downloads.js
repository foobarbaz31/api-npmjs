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

    it('should return data if registry returns data', (done) => {
      const opts = {
        start: '2016-09-20',
        end: '2016-09-25',
        package: 'profanity-cleanser'
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

    it('should return data if registry returns data and range exceeds 30 days', (done) => {
      const opts = {
        start: '2016-09-01',
        end: '2016-12-31',
        package: 'profanity-cleanser'
      };

      /** This gets returned 4 times the stub is called */
      const data = [{
        downloads: 6,
        start: '2016-09-01',
        end: '2016-12-31',
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
        const expectedData = [{
          downloads: 24,
          start: '2016-09-01',
          end: '2016-12-31',
          package: 'profanity-cleanser'
        }];
        expect(item).to.deep.equal(expectedData);
        done();
      });
    });

    it('should return data as 0 if registry returns error indicating no stats found', (done) => {
      const opts = {
        start: '2016-09-01',
        end: '2016-12-31',
        package: 'profanity-cleanser'
      };

      /** This gets returned 4 times the stub is called */
      const data = [{
        error: 'no stats for this package for this period (0002)',
        package: 'profanity-cleanser',
        downloads: 0
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
        const expectedData = [{
          downloads: 0,
          start: '2016-09-01',
          end: '2016-12-31',
          package: 'profanity-cleanser'
        }];
        expect(item).to.deep.equal(expectedData);
        done();
      });
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

    it('should return error if registry returns error inside data object', (done) => {
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
        start: '2016-09-24',
        end: '2016-09-25',
        package: 'profanity-cleanser'
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
            range: stubFunction
          }
        };
      });

      download.fetchRangeDownloads(opts, (err, item) => {
        expect(err).to.be.null;
        expect(item).to.deep.equal(data);

        done();
      });
    });

    it('#should error data if registry returns error inside data object', (done) => {
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

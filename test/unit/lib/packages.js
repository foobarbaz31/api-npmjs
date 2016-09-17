'use strict';

/* eslint-disable arrow-body-style */

const expect = require('chai').expect;
const packages = require('../../../lib/packages');
const registry = require('../../../lib/registry');
const sinon = require('sinon');

describe('#packages', () => {
  let sandbox;

  describe('#fetchPackageInfo', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return error message if registry returns an error', (done) => {
      const opts = {
        package: 'express'
      };

      const stubFunction = function stubFunction(name, func) {
        const err = new Error('Some Error');
        return func(err);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            get: stubFunction
          }
        };
      });

      packages.fetchPackageInfo(opts, (err) => {
        expect(err.message).to.equal('Some Error');
        done();
      });
    });

    it('should return data if registry returns data', (done) => {
      const opts = {
        package: 'express'
      };

      const stubFunction = function stubFunction(name, func) {
        const data = [{ error: 'bar' }];
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            get: stubFunction
          }
        };
      });

      packages.fetchPackageInfo(opts, (err) => {
        expect(err.message).to.equal('bar');
        done();
      });
    });

    it('should return data if registry returns data', (done) => {
      const opts = {
        package: 'express'
      };

      const data = [{
        name: 'profanity-cleanser'
      }];

      const stubFunction = function stubFunction(name, func) {
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            get: stubFunction
          }
        };
      });

      packages.fetchPackageInfo(opts, (err, item) => {
        expect(err).to.be.null;
        expect(item).to.deep.equal({ name: 'profanity-cleanser', versions: [] });
        done();
      });
    });
  });

  describe('#fetchPackageDepended', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return error message if registry returns an error', (done) => {
      const opts = {
        package: 'express'
      };

      const stubFunction = function stubFunction(name, func) {
        const err = new Error('Some Error');
        return func(err);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            depended: stubFunction
          }
        };
      });

      packages.fetchPackageDepended(opts, (err) => {
        expect(err.message).to.equal('Some Error');
        done();
      });
    });

    it('should return data if registry returns data error', (done) => {
      const opts = {
        package: 'express'
      };

      const stubFunction = function stubFunction(name, func) {
        const data = [{ error: 'bar' }];
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            depended: stubFunction
          }
        };
      });

      packages.fetchPackageDepended(opts, (err) => {
        expect(err.message).to.equal('bar');
        done();
      });
    });

    it('should return data if registry returns data', (done) => {
      const opts = {
        package: 'express'
      };

      const data = [{
        name: 'best-module',
        description: 'Much wow'
      }];

      const stubFunction = function stubFunction(name, func) {
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            depended: stubFunction
          }
        };
      });

      packages.fetchPackageDepended(opts, (err, item) => {
        expect(err).to.be.null;
        expect(item).to.deep.equal([{
          name: 'best-module',
          description: 'Much wow'
        }]);
        done();
      });
    });
  });

  describe('#fetchPackageStarred', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return error message if registry returns an error', (done) => {
      const opts = {
        package: 'express'
      };

      const stubFunction = function stubFunction(name, func) {
        const err = new Error('Some Error');
        return func(err);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            starred: stubFunction
          }
        };
      });

      packages.fetchPackageStarred(opts, (err) => {
        expect(err.message).to.equal('Some Error');
        done();
      });
    });

    it('should return data if registry returns data error', (done) => {
      const opts = {
        package: 'express'
      };

      const stubFunction = function stubFunction(name, func) {
        const data = [{ error: 'bar' }];
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            starred: stubFunction
          }
        };
      });

      packages.fetchPackageStarred(opts, (err) => {
        expect(err.message).to.equal('bar');
        done();
      });
    });

    it('should return data if registry returns data', (done) => {
      const opts = {
        package: 'express'
      };

      const data = ['ssabne', 'foobar'];

      const stubFunction = function stubFunction(name, func) {
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            starred: stubFunction
          }
        };
      });

      packages.fetchPackageStarred(opts, (err, item) => {
        expect(err).to.be.null;
        expect(item).to.deep.equal(data);
        done();
      });
    });
  });

  describe('#fetchPackageKeyword', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return error message if registry returns an error', (done) => {
      const opts = {
        package: 'express'
      };

      const stubFunction = function stubFunction(name, func) {
        const err = new Error('Some Error');
        return func(err);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            keyword: stubFunction
          }
        };
      });

      packages.fetchPackageKeyword(opts, (err) => {
        expect(err.message).to.equal('Some Error');
        done();
      });
    });

    it('should return data if registry returns data error', (done) => {
      const opts = {
        package: 'express'
      };

      const stubFunction = function stubFunction(name, func) {
        const data = [{ error: 'bar' }];
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            keyword: stubFunction
          }
        };
      });

      packages.fetchPackageKeyword(opts, (err) => {
        expect(err.message).to.equal('bar');
        done();
      });
    });

    it('should return data if registry returns data', (done) => {
      const opts = {
        package: 'express'
      };

      const data = [{
        name: 'best-module',
        description: 'Much wow'
      }];

      const stubFunction = function stubFunction(name, func) {
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          packages: {
            keyword: stubFunction
          }
        };
      });

      packages.fetchPackageKeyword(opts, (err, item) => {
        expect(err).to.be.null;
        expect(item).to.deep.equal([{
          name: 'best-module',
          description: 'Much wow'
        }]);
        done();
      });
    });
  });
});

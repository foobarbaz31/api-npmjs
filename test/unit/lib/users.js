'use strict';

/* eslint-disable arrow-body-style */

const expect = require('chai').expect;
const users = require('../../../lib/users');
const registry = require('../../../lib/registry');
const sinon = require('sinon');

describe('#users', () => {
  let sandbox;

  describe('#fetchUserInfo', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return error message if registry returns an error', (done) => {
      const opts = {
        username: 'shwetasabne'
      };

      const stubFunction = function stubFunction(name, func) {
        const err = new Error('Some Error');
        return func(err);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          users: {
            get: stubFunction
          }
        };
      });

      users.fetchUserInfo(opts, (err) => {
        expect(err.message).to.equal('Some Error');
        done();
      });
    });

    it('should return data if registry returns data', (done) => {
      const opts = {
        username: 'shwetasabne'
      };

      const stubFunction = function stubFunction(name, func) {
        const data = [{ error: 'bar' }];
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          users: {
            get: stubFunction
          }
        };
      });

      users.fetchUserInfo(opts, (err) => {
        expect(err.message).to.equal('bar');
        done();
      });
    });

    it('should return data if registry returns data', (done) => {
      const opts = {
        username: 'shwetasabne'
      };

      const data = [{
        _id: 'org.couchdb.user:shwetasabne',
        email: 'shwetasabne@gmail.com',
        name: 'shwetasabne',
        gravatar_id: '0f31e57e9157b381bd6101d7431d48ce',
        gravatar: 'https://secure.gravatar.com/avatar/0f31e57e9157b381bd6101d7431d48ce'
      }];

      const stubFunction = function stubFunction(name, func) {
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          users: {
            get: stubFunction
          }
        };
      });

      users.fetchUserInfo(opts, (err, item) => {
        expect(err).to.be.null;
        expect(item).to.deep.equal(data);
        done();
      });
    });
  });

  describe('#fetchUserPackageInfo', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return error message if registry returns an error', (done) => {
      const opts = {
        username: 'shwetasabne'
      };

      const stubFunction = function stubFunction(name, func) {
        const err = new Error('Some Error');
        return func(err);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          users: {
            list: stubFunction
          }
        };
      });

      users.fetchUserPackageInfo(opts, (err) => {
        expect(err.message).to.equal('Some Error');
        done();
      });
    });

    it('should return data if registry returns data', (done) => {
      const opts = {
        username: 'shwetasabne'
      };

      const stubFunction = function stubFunction(name, func) {
        const data = [{ error: 'bar' }];
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          users: {
            list: stubFunction
          }
        };
      });

      users.fetchUserPackageInfo(opts, (err) => {
        expect(err.message).to.equal('bar');
        done();
      });
    });

    it('should return data if registry returns data', (done) => {
      const opts = {
        username: 'shwetasabne'
      };

      const data = [{
        name: 'profanity-cleanser',
        description: 'Good profanity'
      }];

      const stubFunction = function stubFunction(name, func) {
        return func(null, data);
      };

      sandbox.stub(registry, 'getRegistry', () => {
        return {
          users: {
            list: stubFunction
          }
        };
      });

      users.fetchUserPackageInfo(opts, (err, item) => {
        expect(err).to.be.null;
        expect(item).to.deep.equal(data);
        done();
      });
    });
  });
});

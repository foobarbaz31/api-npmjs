'use strict';

const expect = require('chai').expect;
const rewire = require('rewire');
let registry = require('../../../lib/registry');

describe('#registry', () => {
  describe('#getRegistry', () => {
    it('should return new registry instance', () => {
      const registryInstance = registry.getRegistry();
      expect(registryInstance.mirrors.length).to.be.above(1);
      expect(registryInstance.statservice).to.be.equal('https://api.npmjs.org/');
    });

    it('should return memoized registry instance if exists', () => {
      registry = {};
      registry = rewire('../../../lib/registry');
      registry.__set__('registry', 'This is new registry');
      const registryInstance = registry.getRegistry();
      expect(registryInstance).to.be.equal('This is new registry');
    });
  });
});

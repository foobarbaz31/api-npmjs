'use strict';

const expect = require('chai').expect;
const packagesModel = require('../../../models/packagesModel');

describe('#packagesModel', () => {
  describe('#formatData', () => {
    it('should return formatted data without version correctly', () => {
      const rawData = {
        name: 'foobar',
        'dist-tags': {
          latest: '1.1'
        },
        keywords: ['keyword1', 'keyword2']
      };

      const formatData = packagesModel.formatData(rawData);
      rawData.versions = [];
      expect(formatData).to.deep.equal(rawData);
    });

    it('should return formatData data with versions array', () => {
      const rawData = {
        name: 'foobar',
        'dist-tags': {
          latest: '1.1'
        },
        keywords: ['keyword1', 'keyword2'],
        versions: {
          key1: {
            name: 'apple'
          },
          key2: {
            description: 'banana'
          }
        }
      };
      const formatData = packagesModel.formatData(rawData);
      expect(formatData).to.deep.equal({
        name: 'foobar',
        'dist-tags': { latest: '1.1' },
        keywords: ['keyword1', 'keyword2'],
        versions: [{ name: 'apple' }, { description: 'banana' }]
      });
    });
  });
});

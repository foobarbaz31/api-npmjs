'use strict';

const expect = require('chai').expect;
const dateTimeHelpers = require('../../../helpers/dateTimeHelpers');

describe('#dateTimeHelpers', () => {
  describe('#dateDifference', () => {
    it('should return date difference correctly', () => {
      const start = new Date();
      const end = new Date();
      const diff = dateTimeHelpers.dateDifference(start, end);
      expect(diff).to.equal(0);
    });
  });

  describe('#formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2016-02-10');
      const formattedDate = dateTimeHelpers.formatDate(date);
      expect(formattedDate).to.equal('2016-02-10');
    });
  });

  describe('#dateChunks', () => {
    it('should return correct chunks when period is over 30 days', () => {
      const start = new Date('2015-01-31');
      const end = new Date('2015-07-31');
      const chunks = dateTimeHelpers.dateChunks(start, end, 'months');
      expect(chunks).to.deep.equal([
        { start: '2015-01-31', end: '2015-02-27' },
        { start: '2015-02-28', end: '2015-03-27' },
        { start: '2015-03-28', end: '2015-04-27' },
        { start: '2015-04-28', end: '2015-05-27' },
        { start: '2015-05-28', end: '2015-06-27' },
        { start: '2015-06-28', end: '2015-07-27' },
        { start: '2015-07-28', end: '2015-07-31' }
      ]);
    });

    it('should return correct chunks when period is lesser 30 days', () => {
      const start = new Date('2015-01-31');
      const end = new Date('2015-02-10');
      const chunks = dateTimeHelpers.dateChunks(start, end, 'months');
      expect(chunks).to.deep.equal([
        { start: '2015-01-31', end: '2015-02-10' },
      ]);
    });
  });
});

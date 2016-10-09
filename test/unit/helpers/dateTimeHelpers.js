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
      expect(formattedDate).to.equal('2016-02-09');
    });
  });
});

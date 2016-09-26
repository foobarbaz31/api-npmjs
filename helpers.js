'use strict';

const moment = require('moment');

function dateDifference(start, end) {
  const dateStart = moment(start, 'M/D/YYYY');
  const dateEnd = moment(end, 'M/D/YYYY');
  const dateDiff = dateEnd.diff(dateStart, 'days');
  return dateDiff;
}

function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

module.exports = {
  dateDifference,
  formatDate
};

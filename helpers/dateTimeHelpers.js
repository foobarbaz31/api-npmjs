'use strict';

const moment = require('moment-timezone');
const lodash = require('lodash');

function dateDifference(start, end) {
  const dateStart = moment(start, 'M/D/YYYY');
  const dateEnd = moment(end, 'M/D/YYYY');
  const dateDiff = dateEnd.diff(dateStart, 'days');
  return dateDiff;
}

function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

function dateChunks(start, end, chunkPeriod) {
  const dates = [];
  for (let m = moment(start); m.isBefore(end); m.add(chunkPeriod, 1)) {
    const tempObject = {};
    const tempMoment = lodash.cloneDeep(m);
    tempObject.start = tempMoment.format('YYYY-MM-DD');
    const next = tempMoment.add(chunkPeriod, 1);
    if (next.isBefore(end)) {
      tempObject.end = next.subtract('days', 1).format('YYYY-MM-DD');
    }
    dates.push(tempObject);
  }
  const momentEnd = moment(end);
  dates[dates.length - 1].end = momentEnd.format('YYYY-MM-DD');
  return dates;
}

module.exports = {
  dateDifference,
  formatDate,
  dateChunks
};

import moment from 'moment';
import { STATE_CODES } from '../constants/constants';

const validateCTS = (data = []) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dataTypes = [
    'dailyconfirmed',
    'dailydeceased',
    'dailyrecovered',
    'totalconfirmed',
    'totaldeceased',
    'totalrecovered',
  ];
  return data
    .filter((d) => dataTypes.every((dt) => d[dt]) && d.date)
    .filter((d) => dataTypes.every((dt) => Number(d[dt]) >= 0))
    .filter((d) => {
      const year = today.getFullYear();
      return new Date(d.date + year) < today;
    });
};

export const preprocessTimeseries = (timeseries) => {
  return validateCTS(timeseries).map((stat, index) => ({
    date: new Date(stat.date + ' 2020'),
    totalconfirmed: +stat.totalconfirmed,
    totalrecovered: +stat.totalrecovered,
    totaldeceased: +stat.totaldeceased,
    dailyconfirmed: +stat.dailyconfirmed,
    dailyrecovered: +stat.dailyrecovered,
    dailydeceased: +stat.dailydeceased,
    // Active = Confimed - Recovered - Deceased
    totalactive:
      +stat.totalconfirmed - +stat.totalrecovered - +stat.totaldeceased,
    dailyactive:
      +stat.dailyconfirmed - +stat.dailyrecovered - +stat.dailydeceased,
  }));
};

/**
 * Returns the last `days` entries
 * @param {Array<Object>} timeseries
 * @param {number} days
 *
 * @return {Array<Object>}
 */
export function sliceTimeseriesFromEnd(timeseries, days) {
  return timeseries.slice(-days);
}

export const formatNumber = (value) => {
  const numberFormatter = new Intl.NumberFormat('en-IN');
  return isNaN(value) ? '-' : numberFormatter.format(value);
};

export const parseStateTimeseries = ({ states_daily: data }) => {
  const statewiseSeries = Object.keys(STATE_CODES).reduce((a, c) => {
    a[c] = [];
    return a;
  }, {});

  const today = moment();
  for (let i = 0; i < data.length; i += 3) {
    const date = moment(data[i].date, 'DD-MMM-YY');
    // Skip data from the current day
    if (date.isBefore(today, 'Date')) {
      Object.entries(statewiseSeries).forEach(([k, v]) => {
        const stateCode = k.toLowerCase();
        const prev = v[v.length - 1] || {};
        // Parser
        const dailyconfirmed = +data[i][stateCode] || 0;
        const dailyrecovered = +data[i + 1][stateCode] || 0;
        const dailydeceased = +data[i + 2][stateCode] || 0;
        const totalconfirmed = +data[i][stateCode] + (prev.totalconfirmed || 0);
        const totalrecovered =
          +data[i + 1][stateCode] + (prev.totalrecovered || 0);
        const totaldeceased =
          +data[i + 2][stateCode] + (prev.totaldeceased || 0);
        // Push
        v.push({
          date: date.toDate(),
          dailyconfirmed: dailyconfirmed,
          dailyrecovered: dailyrecovered,
          dailydeceased: dailydeceased,
          totalconfirmed: totalconfirmed,
          totalrecovered: totalrecovered,
          totaldeceased: totaldeceased,
          // Active = Confimed - Recovered - Deceased
          totalactive: totalconfirmed - totalrecovered - totaldeceased,
          dailyactive: dailyconfirmed - dailyrecovered - dailydeceased,
        });
      });
    }
  }

  return statewiseSeries;
};

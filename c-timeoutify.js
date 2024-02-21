'use strict';

const { timeoutify } = require('metautil');
const { measure, calculateAverage } = require('./utils');

const URL = 'https://developer.mozilla.org/';
const ITERATIONS = Number(process.env['ITERATIONS']) || 10;
const TIMEOUT = 1000;

const metautilTimeoutify = async () => await timeoutify(fetch(URL), TIMEOUT);

(async () => {
  const result = await measure(metautilTimeoutify, ITERATIONS);
  console.table(calculateAverage(result));
})();

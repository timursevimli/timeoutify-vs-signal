'use strict';

const { timeoutify } = require('metautil');
const { measure, calculateAverage } = require('./utils');

const URL = 'https://developer.mozilla.org/';
const ITERATIONS = Number(process.env['ITERATIONS']) || 10;
const TIMEOUT = 1000;

const metaufilTimeoutify = async () => await timeoutify(fetch(URL), TIMEOUT);

(async () => {
  const result = await measure(metaufilTimeoutify, ITERATIONS);
  console.table(calculateAverage(result));
})();

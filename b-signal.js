'use strict';

const { measure, calculateAverage } = require('./utils');

const URL = 'https://developer.mozilla.org/';
const ITERATIONS = Number(process.env['ITERATIONS']) || 10;
const TIMEOUT = 1000;

const abortSignal = async () => {
  const signal = AbortSignal.timeout(TIMEOUT);
  return await fetch(URL, { signal });
};

(async () => {
  const result = await measure(abortSignal, ITERATIONS);
  console.table(calculateAverage(result));
})();

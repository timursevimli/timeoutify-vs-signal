'use strict';

const { measure, calculateAverage } = require('./utils');

const URL = 'https://developer.mozilla.org/';
const ITERATIONS = Number(process.env['ITERATIONS']) || 10;

const abortController = async () => {
  const controller = new AbortController();
  return await fetch(URL, { signal: controller.signal });
};

(async () => {
  const result = await measure(abortController, ITERATIONS);
  console.table(calculateAverage(result));
})();

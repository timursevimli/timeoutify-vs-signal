'use strict';

const { measure } = require('./utils.js');

const ITERATIONS = Number(process.env['ITERATIONS']) || 10_000;
const TIMEOUT = 1_000;

const timeoutify = (promise, msec) =>
  new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      timer = null;
      reject(new Error(`Timeout of ${msec}ms reached`, 'ETIMEOUT'));
    }, msec);
    promise.then(
      (result) => {
        if (!timer) return;
        clearTimeout(timer);
        resolve(result);
      },
      (error) => {
        if (!timer) return;
        clearTimeout(timer);
        reject(error);
      },
    );
  });

const metautilTimeoutify = () => timeoutify(new Promise(() => {}), TIMEOUT);

measure(metautilTimeoutify, ITERATIONS);
require('node:v8').writeHeapSnapshot('timeoutify.heapsnapshot');
process.exit(0);

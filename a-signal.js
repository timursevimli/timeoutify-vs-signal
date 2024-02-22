'use strict';

const { measure } = require('./utils');

const ITERATIONS = Number(process.env['ITERATIONS']) || 10_000;
const TIMEOUT = 1_000;

const abortSignal = () => AbortSignal.timeout(TIMEOUT);

measure(abortSignal, ITERATIONS);
require('node:v8').writeHeapSnapshot('signal.heapsnapshot');
process.exit(0);

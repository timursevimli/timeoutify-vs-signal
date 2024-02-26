'use strict';

const { measure } = require('./utils');

const ITERATIONS = Number(process.env['ITERATIONS']) || 10_000;
const TIMEOUT = 1_000;

const abortSignal = () => AbortSignal.timeout(TIMEOUT);

measure(abortSignal, ITERATIONS);
process.exit(0);

'use strict';

const { Worker } = require('node:worker_threads');
const { join } = require('node:path');

const files = [
  'a-signal.js',
  'b-timeoutify.js',
];

for (const file of files) {
  const filePath = join(__dirname, file);
  const worker = new Worker(filePath, { env: { ITERATIONS: 10_000 } });
  worker.on('exit', () => void console.log(`${file} finished`));
}

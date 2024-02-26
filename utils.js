'use strict';

const v8 = require('node:v8');

const UNITS = ['', ' Kb', ' Mb', ' Gb'];

const bytesToSize = (bytes) => {
  if (bytes === 0) return '0';
  const exp = Math.floor(Math.log(bytes) / Math.log(1000));
  const size = bytes / 1000 ** exp;
  const short = Math.round(size, 2);
  const unit = UNITS[exp];
  return short + unit;
};

const diff = (a, b) => ({
  rss: bytesToSize(a.rss - b.rss),
  heapTotal: bytesToSize(a.heapTotal - b.heapTotal),
  heapUsed: bytesToSize(a.heapUsed - b.heapUsed),
  external: bytesToSize(a.external - b.external),
});

const takeSnapshot = (name) => {
  v8.writeHeapSnapshot(`${name}.heapsnapshot`);
};

const measure = (fn, iterations) => {
  const tmp = [];
  const before = process.memoryUsage();
  for (let i = 0; i < iterations; i++) tmp.push(fn());
  const after = process.memoryUsage();
  console.log(`${fn.name} Memory Diff:`, diff(after, before));
  takeSnapshot(fn.name);
};

module.exports = { measure };

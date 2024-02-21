'use strict';

const { performance } = require('perf_hooks');

const usedMemory = () => {
  if (global.gc) gc();
  return process.memoryUsage().heapUsed / 1024 / 1024;
};

const measure = async (fn, iterations) => {
  const statistics = new Array(iterations).fill(null);
  for (let i = 0; i < iterations; i++) {
    const startMemory = usedMemory();
    const startTime = performance.now();
    await fn();
    statistics[i] = {
      time: performance.now() - startTime,
      memory: usedMemory() - startMemory,
    };
  }
  return { name: fn.name, statistics };
};

const calculateAverage = ({ statistics, name }) => {
  const { memory, time } = statistics.reduce((sum, statistic) => ({
    time: sum.time + statistic.time,
    memory: sum.memory + statistic.memory,
  }), { time: 0, memory: 0 });

  return {
    name,
    time,
    avgTime: time / statistics.length,
    memory: `${memory.toFixed(2)} MB`,
  };
};

module.exports = { measure, calculateAverage };

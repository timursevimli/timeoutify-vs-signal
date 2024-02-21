# Timeoutify vs Signal

This repository compares memory usage between timeoutify and signal

## Usage

```bash
  npm install

  node --expose-gc a-controller.js
  node --expose-gc b-signal.js
  node --expose-gc c-timeoutify.js

  # or use ITERATIONS environment for assign iteration count
  # ITERATIONS=50 node --expose-gc c-timeoutify.js
```

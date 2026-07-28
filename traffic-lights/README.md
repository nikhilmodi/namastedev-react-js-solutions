# Traffic Lights

Problem: [NamasteDev — Traffic Lights](https://namastedev.com/practice/traffic-lights) (React.js, Medium)

`App.js` and `styles.css` are provided by the platform as the starting skeleton and are unchanged — the only thing to write is the logic in the component file below.

## Summary

Build a traffic light that cycles automatically through Red → Yellow → Green → Red, with only one light active at a time, using timers to control the delay between transitions (Red→Yellow: 3s, Yellow→Green: 1s, Green→Red: 2s).

## Solutions

- [`TrafficLight.js`](./TrafficLight.js) — my original submitted solution. A `useEffect` keyed on `activeColor` checks the current color, sets the next color/delay, and schedules it with `setTimeout`; cleanup clears the pending timeout so re-renders never leave a stale timer running.
- [`TrafficLight.polished.js`](./TrafficLight.polished.js) — refactor of the same logic into a `TRANSITIONS` lookup table, so there's a single `setTimeout` call instead of three near-identical if-blocks. Same JSX/test-ids, same behavior, less repetition.

## Concepts

`useEffect`, `useState`, `setTimeout`/`clearTimeout`, cleanup functions, state machines

## Demo

- Video: _coming soon_
- Live sandbox: _coming soon_

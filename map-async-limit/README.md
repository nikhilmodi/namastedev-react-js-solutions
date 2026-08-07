# Map Async Limit

Problem: [NamasteDev — Map Async Limit](https://namastedev.com/practice/map-async-limit) (JavaScript, Medium)

## Summary

Implement `mapAsyncLimit(arr, limit, asyncFn)`: run `asyncFn` over every item in `arr`, at most `limit` calls in flight at once, and resolve to the results array in the same order as the input.

## Solutions

- [`mapAsyncLimit.js`](./mapAsyncLimit.js) — my original submitted solution. Sliding-window dispatcher: `nextCall` keeps launching new calls while `(onFlyPromiseCount - resolvedPromiseCount) < limit`, until every item has resolved.
- [`mapAsyncLimit.polished.js`](./mapAsyncLimit.polished.js) — one correctness fix: the dispatch `while` loop only checked `resolvedPromiseCount < arr.length` and the concurrency window, never `onFlyPromiseCount` against `arr.length` itself. Near the end of the array, in-flight count can outpace resolved count enough that the loop launches one call past the last index — `asyncFn(arr[arr.length])`, i.e. `asyncFn(undefined)`. Verified this actually happens: for `mapAsyncLimit([1,2,3,4], 2, delayFn)`, a 5th call fires with `undefined`, and its result lands in `results[4]` — mutating the results array *after* it was already resolved and handed to the caller. Fixed by adding `onFlyPromiseCount < arr.length` to the loop condition, and added an explicit `return` after the terminal `resolve()` so a stray call scheduled just before completion can't fall through into another dispatch round.

## Concepts

Promises, bounded concurrency, sliding-window dispatch, async error propagation

## Demo

- Video: _coming soon_
- Live sandbox: _coming soon_

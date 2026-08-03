# Pyramid Pattern

Problem: [NamasteDev — Pyramid Pattern](https://namastedev.com/practice/pyramid-pattern) (JavaScript, Medium)

## Summary

Write `generatePyramid(n)` returning an array of `n` strings representing a centered pyramid of `*`, each row `2n - 1` characters wide, with row `i` (1-indexed) containing `2i - 1` stars centered by spaces. Invalid input (non-integer, negative, `NaN`, `Infinity`, wrong type) returns `false`; `n = 0` returns `[]`.

## Solutions

- [`generatePyramid.js`](./generatePyramid.js) — my original submitted solution. Outer loop walks each row `i`, inner loop walks every column `j` in the `2n - 1`-wide row and decides `*` vs space by checking whether `j` falls inside the centered window `[n - i + 1, n + i - 1]`.
- [`generatePyramid.polished.js`](./generatePyramid.polished.js) — same validation and output, but drops the inner loop: row `i` is just `n - i` leading spaces, `2i - 1` stars, `n - i` trailing spaces, built directly with `' '.repeat()` / `'*'.repeat()` and a template literal. Same result, no per-character branching.

## Concepts

Loop-based string construction, input validation, `String.prototype.repeat`

## Demo

- Video: _coming soon_
- Live sandbox: _coming soon_

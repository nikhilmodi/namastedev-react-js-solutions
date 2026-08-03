# Searchable Dropdown

Problem: [NamasteDev — Searchable Dropdown](https://namastedev.com/practice/searchable-dropdown) (React.js, Medium)

`styles.css` is provided by the platform as the starting skeleton and is unchanged — the only thing to write is the logic in `App.js`.

## Summary

Build a reusable multi-select searchable dropdown with tag-based selection and keyboard navigation (ArrowUp/ArrowDown/Enter/Backspace), similar to Notion/Linear/GitHub multi-select fields.

## Solutions

- [`App.js`](./App.js) — original submitted solution.
- [`App.polished.js`](./App.polished.js) — same JSX/test-ids, four correctness fixes:
  1. `ArrowUp` used `(prev - 1) % length`, which goes negative in JS at index 0 instead of wrapping to the last item — fixed to `(prev - 1 + length) % length`.
  2. `highlightIndex` was never reset when filtering shrank the option list, so a stale index could point past the end of the array and crash `Enter` selection (`availableOptions[highlightIndex]` undefined) — added an effect that re-anchors it to `0` whenever `availableOptions` changes.
  3. `Backspace` wasn't handled at all, despite being a required interaction (remove last tag when input is empty) — added.
  4. The spec's fixed `data-testid="highlighted-option"` wasn't rendered anywhere (only the `highlighted` CSS class was) — added, assigned to whichever option is currently highlighted **instead of** its dynamic `dropdown-option-<value>` id for that render, since an element can only carry one `data-testid`. Worth double-checking against your test suite that this swap (rather than, say, a second attribute) is what's expected.

## Concepts

`useMemo`, `useState`, `useEffect`, `useRef`, controlled input, keyboard navigation, multi-select pattern

## Demo

- Video: _coming soon_
- Live sandbox: _coming soon_

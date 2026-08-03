function generatePyramid(n) {
  if (!Number.isInteger(n) || n < 0) {
    return false;
  }
  if (n === 0) {
    return [];
  }
  const arr = [];
  for (let i = 1; i <= n; i++) {
    let row = '';

    for (let j = 1; j <= 2 * n - 1; j++) {
      if (j >= n - i + 1 && j <= n + i - 1) {
        row += '*';
      } else {
        row += ' ';
      }
    }

    arr.push(row);
  }

  return arr;
}

module.exports = { generatePyramid };

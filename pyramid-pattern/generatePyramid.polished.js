function generatePyramid(n) {
  if (!Number.isInteger(n) || n < 0) return false;
  if (n === 0) return [];

  const arr = [];
  for (let i = 1; i <= n; i++) {
    const spaces = ' '.repeat(n - i);
    const stars = '*'.repeat(2 * i - 1);

    arr.push(`${spaces}${stars}${spaces}`);
  }

  return arr;
}

module.exports = { generatePyramid };

export function transpose(matrix: string[]) {
  const cols: string[] = [];
  for (const row of matrix) {
    for (let x = 0; x < row.length; x++) {
      cols[x] ??= "";
      cols[x] += row[x];
    }
  }
  return cols;
}

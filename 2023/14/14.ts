import { transpose } from "../../utils/matrix";
import { day14Demo } from "./14data";

function tiltPlatform(cols: string[]) {
  return cols;
}

function computeLoad(cols: string[]) {
  return cols.reduce((total, col) => {
    let local = 0;
    const size = col.length;
    for (let i = 0; i < size; i++) {
      if (col[i] === 'O') {
        local += size - i;
      }
    }
    return total + local;
  }, 0)
}

function part1(input: string) {
  const rows = input.split("\n");
  const cols = tiltPlatform(transpose(rows));
  return computeLoad(cols);
}

console.log("Part 1", part1(day14Demo));

// function part2(input: string) {
//   const lines = input.split("\n");
//   return lines;
// }

// console.log("Part 2", part2(day14Demo));
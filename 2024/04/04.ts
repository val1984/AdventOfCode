import { concat } from "../../utils/iterator.ts";
import { day04Demo, day04Inputs } from "./04data.ts";

function* columns(lines: readonly string[]) {
  for (let i = 0; i < lines[0].length; i++) {
    let col = "";
    for (let j = 0; j < lines.length; j++) {
      col += lines[j][i];
    }
    yield col;
  }
}

function* diagonals(lines: readonly string[], minSize = 4) {
  const size = lines.length;
  for (let i = minSize - 1; i < 2 * size - minSize; i++) {
    let diag = "";
    for (let j = 0; j <= i; j++) {
      diag += lines?.[i - j]?.[j] ?? "";
    }
    yield diag;
  }
}

export function* antiDiagonals(lines: readonly string[], minSize = 4) {
  const size = lines.length;
  for (let i = minSize; i <= 2 * size - minSize; i++) {
    let diag = "";
    for (let j = 0; j <= i; j++) {
      diag += lines?.[size - i + j]?.[j] ?? "";
    }
    yield diag;
  }
}

const xmasRegex = /XMAS/g;
const samxRegex = /SAMX/g;

function part1(inputs: string) {
  let totalCount = 0;
  const lines = inputs.split("\n");
  for (const line of concat(
    lines,
    columns(lines),
    diagonals(lines),
    antiDiagonals(lines)
  )) {
    totalCount += line.match(xmasRegex)?.length ?? 0;
    totalCount += line.match(samxRegex)?.length ?? 0;
  }
  return totalCount;
}

console.log(part1(day04Inputs));

const samMasRegex = /SAM|MAS/;

function* matchingCrosses(lines: readonly string[]) {
  const size = lines.length;
  for (let i = 1; i < size - 1; i++) {
    for (let j = 1; j < size - 1; j++) {
      const diag1 = `${lines[i - 1][j - 1]}${lines[i][j]}${
        lines[i + 1][j + 1]
      }`;
      const diag2 = `${lines[i - 1][j + 1]}${lines[i][j]}${
        lines[i + 1][j - 1]
      }`;
      yield Boolean(diag1.match(samMasRegex) && diag2.match(samMasRegex));
    }
  }
}

function part2(inputs: string) {
  let totalCount = 0;
  const lines = inputs.split("\n");
  for (const matching of matchingCrosses(lines)) {
    if (matching) {
      totalCount++;
    }
  }
  return totalCount;
}

console.log(part2(day04Inputs));

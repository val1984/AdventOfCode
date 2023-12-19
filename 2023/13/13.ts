import { day13Demo, day13Input } from "./13data.ts";

function extractRows(puzzle: string) {
  return puzzle.split("\n");
}

function extractCols(rows: string[]) {
  const cols: string[] = [];
  for (const row of rows) {
    for (let x = 0; x < row.length; x++) {
      cols[x] ??= "";
      cols[x] += row[x];
    }
  }
  return cols;
}

function computeDistance(input1: string, input2: string) {
  let distance = 0;
  for (let i = 0; i < input1.length; i++) {
    if (input1[i] !== input2[i]) {
      distance++;
    }
  }
  return distance;
}

function findReflection(inputs: string[], allowedDefects = 0) {
  for (let i = 1; i < inputs.length; i++) {
    let totalDefects = 0;

    for (let j = 0; i + j < inputs.length && i - j > 0; j++) {
      const preLine = inputs[i - j - 1];
      const postLine = inputs[i + j];
      const defects = computeDistance(preLine, postLine);
      totalDefects += defects;
      if (totalDefects > allowedDefects) {
        // Too many defects, exit reflection check loop to try a new i value
        break;
      }
    }
    if (totalDefects !== allowedDefects) {
      // Not the exact number of defects, try next line
      continue;
    }
    // Found the reflection with exact number of defects
    return i;
  }
  // No reflection found
  return 0;
}

function makeComputeReflectionScore(allowedDefects = 0) {
  return (total: number, puzzle: string, _index: number) => {
    const lines = extractRows(puzzle);
    const verticalReflectionPoint = findReflection(lines, allowedDefects);
    const cols = extractCols(lines);
    const horizontalReflectionPoint = findReflection(cols, allowedDefects);
    return total + (horizontalReflectionPoint || 100 * verticalReflectionPoint);
  };
}
function part1(input: string) {
  const puzzles = input.split("\n\n");
  return puzzles.reduce(makeComputeReflectionScore(), 0);
}

console.log("Part 1", part1(day13Input));

function part2(input: string) {
  const puzzles = input.split("\n\n");
  return puzzles.reduce(makeComputeReflectionScore(1), 0);
}

console.log("Part 2", part2(day13Input));

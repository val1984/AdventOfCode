import { day13Demo, day13Input } from "./13data.js";

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

function findReflection(inputs: string[], allowedDefects = 0, from = 0) {
  let previousInput = inputs[0];
  let i = from + 1;
  while (i < inputs.length && computeDistance(inputs[i], previousInput) > allowedDefects) {
    previousInput = inputs[i++];
  }
  if (i < inputs.length) {
    let totalDefects = computeDistance(inputs[i], previousInput)
    // console.log(i);
    let isReflection = true;
    let j = 1;
    while (isReflection && i + j < inputs.length && i - j > 0) {
      const postReflection = inputs[i + j];
      const preReflection = inputs[i - j - 1];
      const defects = computeDistance(postReflection, preReflection);
      totalDefects += defects;
      isReflection &&= totalDefects <= allowedDefects;
      console.log(i, j, i + j, i - j - 1, postReflection, preReflection, isReflection);
      j++;
    }
    if (isReflection && totalDefects === allowedDefects) {
      return i;
    } else {
      return findReflection(inputs, allowedDefects, i);
    }
  }
  return 0;
}

function makeComputeReflectionScore(allowedDefects = 0) {
  return (total: number, puzzle: string, index: number) => {
    const lines = extractRows(puzzle);
    console.log('Vertical');
    const verticalReflectionPoint = findReflection(lines, allowedDefects);
    console.log('Horizontal');
    const cols = extractCols(lines);
    const horizontalReflectionPoint = findReflection(cols, allowedDefects);
    console.log(
      "Puzzle",
      index,
      horizontalReflectionPoint,
      verticalReflectionPoint
    );
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

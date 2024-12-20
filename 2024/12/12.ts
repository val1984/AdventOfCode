import { day12Demo, day12Inputs } from "./12data.ts";

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
] as const;

function* visit(
  grid: string[][],
  r: number,
  c: number,
  visited: boolean[][],
  letter = grid[r][c]
): Generator<[area: number, perimeter: number]> {
  const block = grid[r]?.[c];

  if (block !== letter) {
    yield [0, 1];
    return;
  }
  if (visited[r]?.[c]) {
    return;
  }
  visited[r] ??= [];
  visited[r][c] = true;
  yield [1, 0];
  for (const [dr, dc] of directions) {
    yield* visit(grid, r + dr, c + dc, visited, letter);
  }
}

function sumTuple(
  [a1, b1]: [number, number],
  [a2, b2]: [number, number]
): [number, number] {
  return [a1 + a2, b1 + b2];
}

function part1(inputs: string) {
  const grid = inputs.split("\n").map((line) => Array.from(line));
  let total = 0;
  let visited: boolean[][] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const [zoneArea, zonePerimeter] = visit(grid, r, c, visited).reduce(
        sumTuple,
        [0, 0]
      );
      total += zoneArea * zonePerimeter;
    }
  }
  return total;
}

console.log(part1(day12Inputs));

function part2(inputs: string) {
  const grid = inputs.split("\n").map((line) => Array.from(line));
  let total = 0;
  let visited: boolean[][] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const [zoneArea, zonePerimeter] = visit(grid, r, c, visited).reduce(
        sumTuple,
        [0, 0]
      );
      total += zoneArea * zonePerimeter;
      if (zoneArea !== 0) {
        console.log(grid[r][c], zoneArea, zonePerimeter);
      }
    }
  }
  return total;
}

console.log(part2(day12Demo));

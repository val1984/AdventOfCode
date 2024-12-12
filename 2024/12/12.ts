import { day12Demo, day12Inputs } from "./12data.ts";

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
] as const;

let visited: boolean[][] = [];

function* visit(
  grid: string[][],
  r: number,
  c: number,
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
    yield* visit(grid, r + dr, c + dc, letter);
  }
}

function part1(inputs: string) {
  const grid = inputs.split("\n").map((line) => Array.from(line));
  let total = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const [zoneArea, zonePerimeter] = visit(grid, r, c).reduce(
        ([totalArea, totalPerimeter], [area, perimeter]) => [
          totalArea + area,
          totalPerimeter + perimeter,
        ],
        [0, 0]
      );
      total += zoneArea * zonePerimeter;
    }
  }
  return total;
}

console.log(part1(day12Inputs));

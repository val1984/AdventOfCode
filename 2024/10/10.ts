import { day10Demo, day10Inputs } from "./10data.ts";

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
] as const;

function fill(grid: number[][], r: number, c: number, expectedHeight = 0, visited: boolean[][] = []): number {
  const height = grid[r]?.[c];
  if (height !== expectedHeight || visited[r]?.[c]) {
    return 0;
  }
  visited[r] ??= [];
  visited[r][c] = true;
  if (height === 9) {
    return 1;
  }
  return directions.reduce((acc, [dr, dc]) => acc + fill(grid, r + dr, c + dc, height + 1, visited), 0)
}

function part1(inputs: string) {
  const grid = inputs.split("\n").map((line) => Array.from(line).map(Number));
  let total = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid.length; c++) {
      if (grid[r][c] === 0) {
        const trailScore = fill(grid, r, c);
        total += trailScore;
      }
    }
  }
  return total;
}

console.log("Part 1:", part1(day10Inputs));

function fill2(grid: number[][], r: number, c: number, expectedHeight = 0): number {
  const height = grid[r]?.[c];
  if (height !== expectedHeight) {
    return 0;
  }
  if (height === 9) {
    return 1;
  }
  return directions.reduce((acc, [dr, dc]) => acc + fill2(grid, r + dr, c + dc, height + 1), 0)
}

function part2(inputs: string) {
  const grid = inputs.split("\n").map((line) => Array.from(line).map(Number));
  let total = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid.length; c++) {
      if (grid[r][c] === 0) {
        const trailScore = fill2(grid, r, c);
        total += trailScore;
      }
    }
  }
  return total;
}

console.log("Part 2:", part2(day10Inputs));

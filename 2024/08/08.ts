import { day08Demo, day08Inputs } from "./08data.ts";

type Position = [row: number, col: number];

function makeIsWithinBounds(rowCount: number, colCount: number) {
  return function isWithinBounds(r: number, c: number) {
    return r >= 0 && r < rowCount && c >= 0 && c < colCount;
  };
}

function getAntennaPositions(grid: string[][]) {
  const antennas: Record<string, Position[]> = {};
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const block = grid[r][c];
      if (block !== ".") {
        antennas[block] ??= [];
        antennas[block].push([r, c]);
      }
    }
  }
  return antennas;
}

function part1(inputs: string) {
  const grid = inputs.split("\n").map((line) => Array.from(line));
  const antennas = getAntennaPositions(grid);
  let total = 0;
  const isWithinBounds = makeIsWithinBounds(grid.length, grid[0].length);
  for (const positions of Object.values(antennas)) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [r1, c1] = positions[i];
        const [r2, c2] = positions[j];
        const dr = r2 - r1;
        const dc = c2 - c1;
        const ar1 = r1 - dr;
        const ac1 = c1 - dc;
        const ar2 = r2 + dr;
        const ac2 = c2 + dc;
        if (isWithinBounds(ar1, ac1) && grid[ar1][ac1] !== "#") {
          grid[ar1][ac1] = "#";
          total++;
        }
        if (isWithinBounds(ar2, ac2) && grid[ar2][ac2] !== "#") {
          grid[ar2][ac2] = "#";
          total++;
        }
      }
    }
  }
  return total;
}

console.log(part1(day08Inputs));

function part2(inputs: string) {
  const grid = inputs.split("\n").map((line) => Array.from(line));
  const antennas = getAntennaPositions(grid);
  let total = 0;
  const isWithinBounds = makeIsWithinBounds(grid.length, grid[0].length);
  for (const positions of Object.values(antennas)) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        let [r1, c1] = positions[i];
        let [r2, c2] = positions[j];
        const dr = r2 - r1;
        const dc = c2 - c1;
        
        while (isWithinBounds(r1, c1)) {
          if (grid[r1][c1] !== "#") {
            grid[r1][c1] = "#";
            total++;
          }
          r1 -= dr;
          c1 -= dc;
        }
        while (isWithinBounds(r2, c2)) {
          if (grid[r2][c2] !== "#") {
            grid[r2][c2] = "#";
            total++;
          }
          r2 += dr;
          c2 += dc;
        }
      }
    }
  }
  return total;
}

console.log(part2(day08Inputs));

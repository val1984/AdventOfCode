import { transpose } from "../../utils/matrix";
import { day16Demo, day16Input } from "./16data";

type Vector = [r: number, c: number, dr: number, dc: number];

function part1(input: string) {
  const rows = input.split("\n");
  return visit(rows, [0, 0, 0, 1]);
}

function visit(rows: string[], origin: Vector) {
  let waveFronts: Vector[] = [origin];
  let visited: boolean[][] = rows.map(() => []);
  let visitedCount = 0;
  let changed = true;
  let iteration = 0;
  let allowedRetries = 5;
  while (allowedRetries > 0) {
    // console.log(`Iteration`, ++iteration, visitedCount);
    if (!changed) {
      allowedRetries--;
    } else {
      allowedRetries = 5;
    }
    changed = false;
    waveFronts = waveFronts.filter(
      ([r, c]) => r >= 0 && c >= 0 && r < rows.length && c < rows[0].length
    );
    const currentWaveLength = waveFronts.length;
    for (let i = 0; i < currentWaveLength; i++) {
      const [r, c, dr, dc] = waveFronts[i];
      // console.log("Wave", i, rows[r][c], `${r},${c} => ${dr},${dc}`);
      const current = rows[r][c];
      if (!visited[r][c]) {
        changed = true;
        visitedCount++;
        visited[r][c] = true;
      }
      switch (true) {
        case current === ".":
        case current === "-" && dc !== 0:
        case current === "|" && dr !== 0:
          waveFronts[i][0] += dr;
          waveFronts[i][1] += dc;
          break;
        case current === "|" && dc !== 0:
          waveFronts.push([r, c, -dc, 0]);
        case current === "\\":
          waveFronts[i][0] += dc;
          waveFronts[i][1] += dr;
          waveFronts[i][2] = dc;
          waveFronts[i][3] = dr;
          break;
        case current === "-" && dr !== 0:
          waveFronts.push([r, c + dr, 0, dr]);
        case current === "/":
          waveFronts[i][0] -= dc;
          waveFronts[i][1] -= dr;
          waveFronts[i][2] = -dc;
          waveFronts[i][3] = -dr;
          break;
      }
    }
  }
  return visitedCount;
}

// console.log("Part 1", part1(day16Input));

function part2(input: string) {
  const rows = input.split("\n");
  let maxEnergy = 0;
  for (let i = 0; i < rows.length; i++) {
    maxEnergy = Math.max(
      maxEnergy,
      visit(rows, [0, i, 1, 0]),
      visit(rows, [i, 0, 0, 1]),
      visit(rows, [0, rows.length - 1 - i, -1, 0]),
      visit(rows, [rows.length - 1 - i, 0, 0, -1])
    );
  }
  return maxEnergy;
}

console.log("Part 2", part2(day16Demo));

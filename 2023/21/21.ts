import { day21Demo, day21Input } from "./21data.ts";

type Coords = [r: number, c: number];

function findStartCoords(rows: string[]): Coords {
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[0].length; c++) {
      if (rows[r][c] === "S") {
        return [r, c];
      }
    }
  }
  throw new Error("Input does not include a starting point");
}

function coordsToNumber([r, c]: Coords) {
  return r * 1_000 + c;
}

function numberToCoords(value: number): Coords {
  return [Math.floor(value / 1_000), value % 1_000];
}

const neighbors: Coords[] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function part1(input: string, iterations: number) {
  const rows = input.split("\n");
  const start = findStartCoords(rows);
  let waveSize = 1;
  let prevWave: Coords[] = [start];
  for (let i = 0; i < iterations; i++) {
    const visited = new Set<number>();
    // console.log("Wave", i);
    const currentWave: Coords[] = [];
    for (const [r, c] of prevWave) {
      for (const [dr, dc] of neighbors) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < rows.length &&
          nc < rows[0].length &&
          rows[nr][nc] !== "#"
        ) {
          if (!visited.has(coordsToNumber([nr, nc]))) {
            // console.log("Visited", [nr, nc]);
            currentWave.push([nr, nc]);
          }
          visited.add(coordsToNumber([nr, nc]));
        }
      }
    }
    waveSize = visited.size;
    prevWave = currentWave;
  }
  return waveSize;
}

console.log("Part 1", part1(day21Input, 64));

// function part2(input: string) {
//   return input;
// }

// console.log('Part 2', part2(day21Demo));

import assert from "node:assert";
import { day21Demo, day21Input } from "./21data.ts";
import { transpose } from "../../utils/matrix.ts";

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

const neighbors: Coords[] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function fill(rows: string[], start: Coords): [number, number, number];
function fill(rows: string[], start: Coords, iterations: number): number;
function fill(
  rows: string[],
  start: Coords,
  iterations?: number
): [number, number, number] | number {
  let waveSize = 1;
  let prevWaveSize = 1;
  let prevWave: Coords[] = [start];
  const loopLimit = iterations ?? Number.MAX_SAFE_INTEGER;
  for (let i = 1; i <= loopLimit; i++) {
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
    if (!iterations && prevWaveSize === visited.size) {
      console.log("Cycle detected at", i);
      return [i - 2, prevWaveSize, waveSize];
    }
    prevWaveSize = waveSize;
    waveSize = visited.size;
    prevWave = currentWave;
    // console.log("Wave", i, waveSize);
  }
  return waveSize;
}

function part1(input: string, iterations: number) {
  const rows = input.split("\n");
  const start = findStartCoords(rows);
  let waveSize = fill(rows, start, iterations);
  return waveSize;
}

console.log("Part 1", part1(day21Input, 64));

function part2(input: string, iterations: number) {
  const rows = input.split("\n");
  const size = rows.length;
  assert(size === rows[0].length);
  const start = findStartCoords(rows);
  assert(Math.floor(size / 2) === start[0]);
  assert(start[0] === start[1]);
  const middle = start[0];
  assert(
    Array.from(rows[middle]).every((char) => char === "." || char === "S")
  );
  assert(
    Array.from(transpose(rows)[middle]).every(
      (char) => char === "." || char === "S"
    )
  );
  const even = fill(rows, start, 2 * size);
  const odd = fill(rows, start, 2 * size + 1);
  const gridsCount = (iterations - middle) / rows.length;
  console.log(gridsCount);
  const cornerStarts: Coords[] = [
    [middle, size - 1],
    [size - 1, middle],
    [middle, 0],
    [0, middle],
  ];
  const corners = cornerStarts.reduce(
    (cornersCount, coords) => cornersCount + fill(rows, coords, size - 1),
    0
  );

  const sideStarts: Coords[] = [
    [size - 1, size - 1],
    [0, size - 1],
    [0, 0],
    [size - 1, 0],
  ];
  const small = sideStarts.reduce(
    (cornersCount, coords) => cornersCount + fill(rows, coords, middle - 1),
    0
  );
  const large = sideStarts.reduce(
    (cornersCount, coords) =>
      cornersCount + fill(rows, coords, Math.floor((3 * size) / 2) - 1),
    0
  );
  let total = 0;
  const mod = gridsCount % 2;
  for (let r = 1; r < gridsCount; r++) {
    const evenPerRow = r - mod;
    const oddPerRow = r - 1 + mod;
    total += 2 * evenPerRow * even + 2 * oddPerRow * odd;
  }
  total += gridsCount * even + (gridsCount - 1) * odd;
  total += corners + gridsCount * small + (gridsCount - 1) * large;

  return total;
}

console.log("Part 2", part2(day21Input, 26501365));

import { day23Demo, day23Input } from "./23data.ts";

type Coords = readonly [r: number, c: number];
type CoordsWithSteps = readonly [
  ...Coords,
  dr: number,
  dc: number,
  steps: number
];

const mapDir = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

function coordsToNumber([r, c]: Coords) {
  return 1000 * r + c;
}

function coordsWithStepsToNumber([r, c, dr, dc, steps]: CoordsWithSteps) {
  return 10_000_000 * steps + 10_000 * r + 10 * c + mapDir.at(dr)!.at(dc)!;
}

function dequeue(priorityQueue: CoordsWithSteps[]) {
  let maxSteps = 0;
  let maxStepsIndex = priorityQueue.reduce(
    (maxIndex, [, , , , steps], index) => {
      if (steps > maxSteps) {
        maxSteps = steps;
        return index;
      } else {
        return maxIndex;
      }
    },
    0
  );
  const [maxStepsElement] = priorityQueue.splice(maxStepsIndex, 1);
  return maxStepsElement;
}

const neighbors: readonly Coords[] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function isAllowed(step: string, dr: number, dc: number) {
  switch (true) {
    case step === ".":
    case dr === -1 && step === "^":
    case dr === 1 && step === "v":
    case dc === -1 && step === "<":
    case dc === 1 && step === ">":
      return true;
    default:
      return false;
  }
}

function parseMap(input: string) {
  const map = input.split("\n").map((line) => Array.from(line));
  const sc = map[0].findIndex((char) => char !== "#");
  const ec = map.at(-1)!.findIndex((char) => char !== "#");
  return { map, sc, ec };
}

function findMaxSteps(input: string) {
  const { sc, map, ec } = parseMap(input);
  const seen = new Set<number>();
  const queue: CoordsWithSteps[] = [[0, sc, 1, 0, 0]];
  const maxSteps = [];
  while (queue.length !== 0) {
    const [r, c, dr, dc, steps] = dequeue(queue);
    // console.log([r, c, dr, dc, steps]);
    const nr = r + dr;
    const nc = c + dc;
    if (nr === map.length - 1 && nc === ec) {
      maxSteps.push(steps + 1);
    }
    neighbors.forEach(([ndr, ndc]) => {
      const newCoords: CoordsWithSteps = [nr, nc, ndr, ndc, steps + 1] as const;
      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < map.length &&
        nc < map[0].length &&
        (nr + ndr !== r || nc + ndc !== c) &&
        !seen.has(coordsWithStepsToNumber(newCoords)) &&
        isAllowed(map[nr][nc], ndr, ndc)
      ) {
        queue.push(newCoords);
        seen.add(coordsWithStepsToNumber(newCoords));
      }
    });
  }
  return Math.max(...maxSteps);
}

function part1(input: string) {
  return findMaxSteps(input);
}

console.log("Part 1", part1(day23Input));

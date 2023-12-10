import { day10Demo, day10Input, day10Part2Demo } from "./10data.js";

type Pipe = "S" | "|" | "-" | "F" | "J" | "7" | "L" | ".";
type Coords = [number, number];

function nextConnectingPipeCoordsDelta(pipe: Pipe): Coords[] {
  switch (pipe) {
    case "|":
      return [
        [0, -1],
        [0, 1],
      ];
    case "-":
      return [
        [-1, 0],
        [1, 0],
      ];
    case "F":
      return [
        [0, 1],
        [1, 0],
      ];
    case "7":
      return [
        [-1, 0],
        [0, 1],
      ];
    case "L":
      return [
        [0, -1],
        [1, 0],
      ];
    case "J":
      return [
        [0, -1],
        [-1, 0],
      ];
    case "S":
      return [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];
    case ".":
      return [];
  }
}

function findStartCoords(map: Pipe[][]): Coords {
  return map.reduce(
    (pos, line, y) => {
      const x = line.indexOf("S");
      return x !== -1 ? [x, y] : pos;
    },
    [-1, -1]
  );
}

function findNextPipeDelta(
  map: Pipe[][],
  [x, y]: Coords,
  [dx, dy]: Coords
): Coords | undefined {
  const next = map[y + dy][x + dx];

  const nextPipes = nextConnectingPipeCoordsDelta(next);
  const nextDelta = nextPipes.find(([nx, ny]) => {
    return dx+nx !== 0 || dy+ny !== 0;
  })!;
  return nextDelta!;
}

function part1(input: string) {
  const map = input.split("\n").map((line) => Array.from(line) as Pipe[]);
  const start = findStartCoords(map);
  let current = start;
  let currentDelta: Coords = nextConnectingPipeCoordsDelta("S").find(
    ([dx, dy]) => {
      const nextPipe = map[start[1] + dy][start[0] + dx];
      const nextPossibleCoordsDelta = nextConnectingPipeCoordsDelta(nextPipe);
      return nextPossibleCoordsDelta.some(
        ([ndx, ndy]) => -ndx === dx && -ndy === dy
      );
    }
  )!;
  let count = 0;
  do {
    const nextDelta = findNextPipeDelta(map, current, currentDelta)!;
    current = current.map((coord, index) => coord + currentDelta[index]) as Coords;
    currentDelta = nextDelta;
    count++;
  } while (current[0] !== start[0] || current[1] !== start[1]);
  return count / 2;
}

console.log("Part 1", part1(day10Input));

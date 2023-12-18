import { day17Demo, day17Input, day17Part2Demo } from "./17data";

const neighbors = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
] as const;

type PriorityQueueElement = [
  hl: number,
  r: number,
  c: number,
  dr: number,
  dc: number,
  times: number
];

function dequeue(priorityQueue: PriorityQueueElement[]) {
  let minHl = Number.MAX_SAFE_INTEGER;
  let minHlIndex = priorityQueue.reduce((minIndex, [hl], index) => {
    if (hl < minHl) {
      minHl = hl;
      return index;
    } else {
      return minIndex;
    }
  }, 0);
  const [minHlElement] = priorityQueue.splice(minHlIndex, 1);
  return minHlElement;
}

function direction(dr: number, dc: number) {
  switch (true) {
    case dc === -1:
      return 1;
    case dc === 1:
      return 2;
    case dr === -1:
      return 3;
    case dr === 1:
      return 4;
    default:
      return 0;
  }
}

function findShortestPath(input: string, maxStraight = 3, minStraight = 0) {
  const rows = input.split("\n").map((line) => Array.from(line).map(Number));
  const visited = rows.map((row) => row.map(() => [] as boolean[][]));
  const priorityQueue: PriorityQueueElement[] = [[0, 0, 0, 0, 0, 0]];
  while (priorityQueue.length !== 0) {
    const [hl, r, c, dr, dc, times] = dequeue(priorityQueue);

    if (
      r === rows.length - 1 &&
      c === rows[0].length - 1 &&
      times >= minStraight
    ) {
      return hl;
    }

    visited[r][c][times] ??= [];
    const dir = direction(dr, dc);
    if (visited[r][c][times][dir]) {
      continue;
    }

    visited[r][c][times][dir] = true;

    if (times < maxStraight && (dr !== 0 || dc !== 0)) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nc >= 0 && nr < rows.length && nc < rows[0].length) {
        priorityQueue.push([hl + rows[nr][nc], nr, nc, dr, dc, times + 1]);
      }
    }
    if (times >= minStraight || (dr === 0 && dc === 0)) {
      for (const [ndr, ndc] of neighbors) {
        if ((ndc === -dc && ndr === -dr) || (ndc === dc && ndr === dr)) {
          continue;
        }
        const nr = r + ndr,
          nc = c + ndc;
        if (nr >= 0 && nc >= 0 && nr < rows.length && nc < rows[0].length) {
          priorityQueue.push([hl + rows[nr][nc], nr, nc, ndr, ndc, 1]);
        }
      }
    }
  }
  return 0;
}

function part1(input: string) {
  return findShortestPath(input);
}

console.log("Part 1", part1(day17Input));

function part2(input: string) {
  return findShortestPath(input, 10, 4);
}

console.log("Part 2", part2(day17Input));

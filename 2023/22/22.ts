import { day22Demo, day22Input } from "./22data.ts";
import assert from "assert";

type Coords = [x: number, y: number, z: number];
interface Brick {
  topLeft: Coords;
  bottomRight: Coords;
  supportedBy: Brick[];
  supports: Brick[];
}

function makeThemFall(sortedBricks: [Coords, Coords][]) {
  const width = Math.max(...sortedBricks.map(([, [x]]) => x)) + 1;
  const depth = Math.max(...sortedBricks.map(([, [, y]]) => y)) + 1;
  const height = Math.max(...sortedBricks.map(([, [, , z]]) => z)) + 1;
  const levels = Array.from(Array(width), () =>
    Array.from(Array(depth), () => 0)
  );
  console.log({ width, depth, height, levels });
  const bricksAtLevel: [Coords, Coords][][] = [];
  for (const [start, end] of sortedBricks) {
    let newZ = levels[start[0]][start[1]];
    for (let x = start[0]; x <= end[0]; x++) {
      for (let y = start[1]; y <= end[1]; y++) {
        newZ = levels[x][y] > newZ ? levels[x][y] : newZ;
      }
    }
    end[2] = end[2] - start[2] + newZ + 1;
    start[2] = newZ + 1;
    bricksAtLevel[newZ + 1] ??= [];
    bricksAtLevel[newZ + 1].push([start, end]);
    for (let x = start[0]; x <= end[0]; x++) {
      for (let y = start[1]; y <= end[1]; y++) {
        levels[x][y] = end[2];
      }
    }
  }
  return bricksAtLevel;
}

function checkOverlap(
  [[x1a, y1a], [x2a, y2a]]: [Coords, Coords],
  [[x1b, y1b], [x2b, y2b]]: [Coords, Coords]
) {
  return (
    Math.max(x1a, x1b) < Math.min(x2a, x2b) &&
    Math.max(y1a, y1b) < Math.min(y2a, y2b)
  );
}

function part1(input: string) {
  const bricks = input.split("\n").map((line) => {
    const [start, end] = line.split("~");
    return [start.split(",").map(Number), end.split(",").map(Number)] as [
      Coords,
      Coords
    ];
  });
  bricks.forEach(([[x1, y1, z1], [x2, y2, z2]]) => {
    assert(x1 <= x2);
    assert(y1 <= y2);
    assert(z1 <= z2);
  });
  bricks.sort(([[, , z1a]], [[, , z2a]]) => z1a - z2a);
  const bricksByLevel = makeThemFall(bricks);
  const linkedBricks: Brick[] = [];
  let total = 0;
  for (let i = 1; i < bricksByLevel.length; i++) {
    const level = bricksByLevel[i];
    for (const brick of level) {
      let supports = 0;
      const [[, , z]] = brick;
      if (z+1 < bricksByLevel.length) {
        for (const brickAbove of bricksByLevel[z + 1]) {
          if (checkOverlap(brick, brickAbove)) {
            supports++;
          }
        }
      }
    }
  }
  return bricksByLevel;
}

console.log("Part 1", part1(day22Demo));

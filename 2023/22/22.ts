import { day22Demo, day22Input } from "./22data.ts";
import assert from "node:assert";

type Coords = [x: number, y: number, z: number];
interface Brick {
  topLeft: Coords;
  bottomRight: Coords;
  supportedBy: Brick[];
  supports: Brick[];
}

const X = 0;
const Y = 1;
const Z = 2;

function makeThemFall(sortedBricks: [Coords, Coords][]) {
  const width = Math.max(...sortedBricks.map(([, [x]]) => x)) + 1;
  const depth = Math.max(...sortedBricks.map(([, [, y]]) => y)) + 1;
  const height = Math.max(...sortedBricks.map(([, [, , z]]) => z)) + 1;
  const world: (Brick | undefined)[][][] = Array.from(Array(width), () =>
    Array.from(Array(depth), () => Array.from(Array(height), () => undefined))
  );
  for (const [start, end] of sortedBricks) {
    let newZ = 0;
    const supports = [];
    for (let x = start[X]; x <= end[X]; x++) {
      for (let y = start[Y]; y <= end[Y]; y++) {
        for (let z = start[Z]; z > 0; z--) {
          if (world[x][y][z] !== undefined) {
            newZ = Math.max(z, newZ);
          }
        }
      }
    }
    end[Z] = end[Z] - start[Z] + newZ + 1;
    start[Z] = newZ + 1;

    const brick = {
      topLeft: start,
      bottomRight: end,
      supportedBy: [],
      supports: [],
    };
    for (let x = start[X]; x <= end[X]; x++) {
      for (let y = start[Y]; y <= end[Y]; y++) {
        for (let z = start[Z]; z <= end[Z]; z++) {
          world[x][y][z] = brick;
        }
      }
    }
  }
  return world;
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
  const world = makeThemFall(bricks);

  return world;
}

console.log("Part 1", part1(day22Demo));

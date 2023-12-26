import { day22Demo, day22Input } from "./22data.ts";
import assert from "node:assert";

declare global {
  interface Set<T> {
    difference(b: Set<T>): Set<T>;
    isSubsetOf(b: Set<T>): boolean;
  }
}

type Coords = [x: number, y: number, z: number];
interface Brick {
  topLeft: Coords;
  bottomRight: Coords;
  supportedBy: Set<Brick>;
  supports: Set<Brick>;
}

const X = 0;
const Y = 1;
const Z = 2;

function makeThemFall(sortedBricks: [Coords, Coords][]) {
  const width = Math.max(...sortedBricks.map(([, [x]]) => x)) + 1;
  const depth = Math.max(...sortedBricks.map(([, [, y]]) => y)) + 1;
  const height = Math.max(...sortedBricks.map(([, [, , z]]) => z)) + 1;
  const world: (Brick | undefined)[][][] = Array.from(Array(width), () =>
    Array.from(Array(depth), () => Array(height))
  );
  const newBricks: Brick[] = [];
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

    const brick: Brick = {
      topLeft: start,
      bottomRight: end,
      supportedBy: new Set<Brick>(),
      supports: new Set<Brick>(),
    };
    newBricks.push(brick);
    for (let x = start[X]; x <= end[X]; x++) {
      for (let y = start[Y]; y <= end[Y]; y++) {
        for (let z = start[Z]; z <= end[Z]; z++) {
          world[x][y][z] = brick;
        }
      }
    }

    const seen = new Set<Brick>();
  }
  for (let z = height - 1; z > 0; z--) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < depth; y++) {
        const brick = world[x][y][z];
        const brickBelow = world[x][y][z - 1];
        if (
          brick !== undefined &&
          brickBelow !== undefined &&
          brick !== brickBelow
        ) {
          brick.supportedBy.add(brickBelow);
          brickBelow.supports.add(brick);
        }
      }
    }
  }
  return newBricks;
}

function parseAndSortBricks(input: string) {
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
  return bricks;
}

function part1(input: string) {
  const bricks = parseAndSortBricks(input);
  const brickList = makeThemFall(bricks);
  let totalZap = 0;
  for (const brick of brickList) {
    let allSupportedByMoreThanOne = true;
    for (const { supportedBy } of brick.supports.values()) {
      allSupportedByMoreThanOne &&= supportedBy.size > 1;
    }
    if (allSupportedByMoreThanOne) {
      totalZap++;
      // console.log(brick);
    }
  }
  return totalZap;
}

console.log("Part 1", part1(day22Input));

function part2(input: string) {
  const bricks = parseAndSortBricks(input);
  const brickList = makeThemFall(bricks);
  let total = 0;
  for (const disintegrated of brickList) {
    const queue: Brick[] = [];
    const fallen = new Set<Brick>();
    for (const above of disintegrated.supports.values()) {
      if (above.supportedBy.size <= 1) {
        queue.push(above);
        fallen.add(above);
      }
    }
    while (queue.length !== 0) {
      const brick = queue.shift()!;
      for (const supportedBrick of brick.supports.difference(fallen)) {
        if (supportedBrick.supportedBy.isSubsetOf(fallen)) {
          queue.push(supportedBrick);
          fallen.add(supportedBrick);
        }
      }
    }
    total += fallen.size;
  }
  return total;
}

console.log("Part 2", part2(day22Input));

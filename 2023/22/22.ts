import { day22Demo, day22Input } from "./22data.ts";

type Coords = [x: number, y: number, z: number];

function makeThemFall(bricks: [Coords, Coords][]) {
  const bricksFromGround = bricks.toSorted(
    ([[, , z1a], [, , z1b]], [[, , z2a], [, , z2b]]) =>
      Math.min(z1a, z1b) - Math.min(z2a, z2b)
  );
  const width = Math.max(...bricks.flatMap(([[x1], [x2]]) => [x1, x2])) + 1;
  const depth = Math.max(...bricks.flatMap(([[, y1], [, y2]]) => [y1, y2])) + 1;
  const height =
    Math.max(...bricks.flatMap(([[, , z1], [, , z2]]) => [z1, z2])) + 1;
  const levels = Array.from(Array(width), () =>
    Array.from(Array(depth), () => 0)
  );
  console.log({ width, depth, height, levels });
  for (const [start, end] of bricks) {
  }
  return bricksFromGround;
}

function part1(input: string) {
  const bricks = input.split("\n").map((line) => {
    const [start, end] = line.split("~");
    return [start.split(",").map(Number), end.split(",").map(Number)] as [
      Coords,
      Coords
    ];
  });
  return makeThemFall(bricks);
}

console.log("Part 1", part1(day22Input));

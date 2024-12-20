import { day14Demo, day14Inputs } from "./14data.ts";

function parse(inputs: string) {
  return inputs
    .split("\n")
    .map((line) =>
      line
        .split(" ")
        .map((vector) => vector.split("=")[1].split(",").map(Number))
    );
}

function part1(inputs: string, width: number, height: number) {
  const data = parse(inputs);
  for (let i = 0; i < 100; i++) {
    for (const [pos, speed] of data) {
      pos[0] = (pos[0] + speed[0] + width) % width;
      pos[1] = (pos[1] + speed[1] + height) % height;
    }
  }
  let topLeft = 0;
  let topRight = 0;
  let bottomLeft = 0;
  let bottomRight = 0;
  const halfWidth = Math.floor(width / 2);
  const halfHeight = Math.floor(height / 2);
  for (const [[x, y]] of data) {
    if (y < halfHeight) {
      if (x < halfWidth) {
        topLeft++;
      } else if (x > halfWidth) {
        topRight++
      }
    } else if (y > halfHeight) {
      if (x < halfWidth) {
        bottomLeft++;
      } else if (x > halfWidth) {
        bottomRight++
      }
    }
  }

  return topLeft * topRight * bottomLeft * bottomRight;
}

console.log("Part 1:", part1(day14Inputs, 101, 103));

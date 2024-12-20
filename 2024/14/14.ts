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

function computeMultipleIterations(
  data: number[][][],
  width: number,
  height: number,
  iterations: number
) {
  for (const [pos, speed] of data) {
    pos[0] = (pos[0] + iterations * (width + speed[0])) % width;
    pos[1] = (pos[1] + iterations * (height + speed[1])) % height;
  }
}

function computeSafetyFactor(
  data: number[][][],
  width: number,
  height: number
) {
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
        topRight++;
      }
    } else if (y > halfHeight) {
      if (x < halfWidth) {
        bottomLeft++;
      } else if (x > halfWidth) {
        bottomRight++;
      }
    }
  }
  return topLeft * topRight * bottomLeft * bottomRight;
}

function part1(inputs: string, width: number, height: number) {
  const data = parse(inputs);
  computeMultipleIterations(data, width, height, 100);

  return computeSafetyFactor(data, width, height);
}

console.log("Part 1:", part1(day14Inputs, 101, 103));

function computeSingleIteration(
  data: number[][][],
  width: number,
  height: number
) {
  for (const [pos, speed] of data) {
    pos[0] = (pos[0] + speed[0] + width) % width;
    pos[1] = (pos[1] + speed[1] + height) % height;
  }
}

function printGrid(data: number[][][], width: number, height: number) {
  const grid = Array.from(Array(height), () =>
    Array.from(Array(width), () => " ")
  );
  for (const [[x, y]] of data) {
    grid[y][x] = "X";
  }
  console.log(grid.map((line) => line.join("")).join("\n"));
}

function part2(inputs: string, width: number, height: number) {
  const data = parse(inputs);
  let minimumSafetyFactor = Number.POSITIVE_INFINITY;
  let minimumIteration = 0;
  for (let i = 0; i < width * height; i++) {
    computeSingleIteration(data, width, height);
    const safetyFactor = computeSafetyFactor(data, width, height);
    if (safetyFactor < minimumSafetyFactor) {
      minimumIteration = i + 1;
      minimumSafetyFactor = safetyFactor;
    }
  }
  const original = parse(inputs);
  computeMultipleIterations(original, width, height, minimumIteration);
  printGrid(original, width, height);
  return minimumIteration;
}

console.log("Part 2:", part2(day14Inputs, 101, 103));

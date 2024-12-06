import { day06Demo, day06Inputs } from "./06data.ts";

const directions = ["N", "E", "S", "W"] as const;
type Direction = (typeof directions)[number];

function turnRight(direction: Direction): Direction {
  return directions[(directions.indexOf(direction) + 1) % directions.length];
}

function part1(inputs: string) {
  const lines = inputs.split("\n");
  let y = lines.findIndex((line) => line.includes("^"));
  let x = lines[y].indexOf("^");
  let direction: Direction = "N";
  let next: string;
  const visited: (Direction | undefined)[][] = Array.from(
    Array(lines.length)
  ).map(() => Array.from(Array(lines.length), () => undefined));
  while (y < lines.length && y >= 0 && x < lines[0].length && x >= 0) {
    visited[y][x] ??= direction;
    switch (direction) {
      case "N":
        y--;
        next = lines[y - 1]?.[x];
        break;
      case "E":
        x++;
        next = lines[y]?.[x + 1];
        break;
      case "S":
        y++;
        next = lines[y + 1]?.[x];
        break;
      case "W":
        x--;
        next = lines[y]?.[x - 1];
        break;
    }
    if (next === "#") {
      direction = turnRight(direction);
    }
  }
  return visited.reduce(
    (total, y) => total + y.reduce((subTotal, x) => subTotal + (x ? 1 : 0), 0),
    0
  );
}

console.log(part1(day06Inputs));

function part2(inputs: string) {
  const startLines = inputs.split("\n").map((line) => Array.from(line));
  const startY = startLines.findIndex((line) => line.includes("^"));
  const startX = startLines[startY].indexOf("^");
  let next: string;

  let total = 0;
  for (let obsX = 0; obsX < startLines.length; obsX++) {
    for (let obsY = 0; obsY < startLines.length; obsY++) {
      if (startLines[obsY][obsX] !== ".") {
        continue;
      }
      let lines = startLines.map((line, y) => obsY === y ? line.map((block, x) => obsX === x ? '#' : block) : line);
      const visited: (Direction | undefined)[][] = Array.from(
        Array(lines.length)
      ).map(() => Array.from(Array(lines.length), () => undefined));
      let y = startY;
      let x = startX;
      let direction: Direction = "N";
      while (y < lines.length && y >= 0 && x < lines[0].length && x >= 0) {
        if (visited[y][x] === direction) {
          total++;
          break;
        }
        visited[y][x] ??= direction;
        if (lines[y][x] === "#") {
          // Go back one step
          switch (direction) {
            case "N":
              y++;
              break;
            case "E":
              x--;
              break;
            case "S":
              y--;
              break;
            case "W":
              x++;
              break;
          }
          direction = turnRight(direction);
        }
        switch (direction) {
          case "N":
            y--;
            break;
          case "E":
            x++;
            break;
          case "S":
            y++;
            break;
          case "W":
            x--;
            break;
        }
      }
    }
  }
  return total;
}

console.log(part2(day06Inputs));

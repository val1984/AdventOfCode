import { day06Demo, day06Inputs } from "./06data.ts";

const directions = ["N", "E", "S", "W"] as const;
type Direction = (typeof directions)[number];

function part1(inputs: string) {
  const lines = inputs.split("\n");
  let y = lines.findIndex((line) => line.includes("^"));
  let x = lines[y].indexOf("^");
  let direction: Direction = "N";
  let next: string;
  const visited = Array.from(Array(lines.length)).map(() =>
    Array.from(Array(lines.length), () => 0)
  );
  while (y < lines.length && y >= 0 && x < lines[0].length && x >= 0) {
    visited[y][x] = 1;
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
      direction =
        directions[(directions.indexOf(direction) + 1) % directions.length];
    }
  }
  return visited.reduce((total, y) => total + y.reduce((subTotal, x) => subTotal + x, 0), 0);
}

console.log(part1(day06Inputs));

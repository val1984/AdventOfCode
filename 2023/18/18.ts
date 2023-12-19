import { day18Demo, day18Input } from "./18data.ts";

const extractPart1InputRegex = /^(\w) (\d+) \(\#.+\)$/;

type Data = readonly [string, number];

function shoeMakerSurface(lines: Data[]) {
  let r = 0,
    c = 0;
  const points: [number, number][] = [[0, 0]];

  for (const [dir, length] of lines) {
    switch (dir) {
      case "L":
        c -= length;
        break;
      case "R":
        c += length;
        break;
      case "U":
        r -= length;
        break;
      case "D":
        r += length;
        break;
    }
    points.push([r, c]);
  }
  let area = 0;
  let perimeter = 2; // perimeter / 2 will miss a square so we start at 2
  for (let i = 1; i < points.length; i++) {
    perimeter += lines[i - 1][1];
    area += points[i - 1][0] * points[i][1] - points[i - 1][1] * points[i][0];
  }
  return (Math.abs(area) + perimeter) / 2;
}

function part1(input: string) {
  const lines = input.split("\n").map((line) => {
    const [, dir, length] = extractPart1InputRegex.exec(line)!;
    return [dir, Number(length)] as const;
  });

  return shoeMakerSurface(lines);
}

console.log("Part 1", part1(day18Input));

const extractPart2InputRegex = /^\w \d+ \(\#(.{5})(.{1})\)$/;
const dirMapping = "RDLU";

function part2(input: string) {
  const lines = input.split("\n").map((line): Data => {
    const [, hexLength, dir] = extractPart2InputRegex.exec(line)!;
    return [dirMapping[Number(dir)], parseInt(hexLength, 16)];
  });

  return shoeMakerSurface(lines);
}

console.log("Part 2", part2(day18Input));

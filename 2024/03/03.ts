import { day03Inputs } from "./03data.ts";

function part1(inputs: string) {
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let match: RegExpExecArray | null;
  let total = 0;
  while ((match = mulRegex.exec(inputs))) {
    const [, x, y] = match;
    total += Number(x) * Number(y);
  }
  return total;
}

console.log(part1(day03Inputs));

function part2(inputs: string) {
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;
  let match: RegExpExecArray | null;
  let total = 0;
  let mulActive = true;
  while ((match = mulRegex.exec(inputs))) {
    const [found, x, y] = match;
    switch (found) {
      case "do()":
        mulActive = true;
        break;
      case "don't()":
        mulActive = false;
        break;
      default:
        if (mulActive) {
          total += Number(x) * Number(y);
        }
    }
  }
  return total;
}

console.log(part2(day03Inputs));

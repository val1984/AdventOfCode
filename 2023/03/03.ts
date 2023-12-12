import { day03Inputs } from "./03data.js";

type Point = readonly [number, number];


function extractSymbolIndices(plan: string[], symbolRegex: RegExp) {
  return plan.reduce((acc, line, x) => {
    for (const { index: y } of line.matchAll(symbolRegex)) {
      acc[x] ??= [];
      acc[x]?.push(y!);
    }
    return acc;
  }, {} as Record<number, number[] | undefined>);
}

function extractNumbers(plan: string[]): [string, ...Point][] {
  return plan.flatMap((line, x) =>
    [...line.matchAll(/(\d+)/g)].map((match): [string, ...Point] => [
      match[0],
      x,
      match.index!,
    ])
  );
}

function allowedRectangle([value, x, y]: [string, ...Point]): [
  number,
  Point,
  Point
] {
  return [
    Number(value),
    [Math.max(0, x - 1), Math.max(0, y - 1)],
    [x + 1, y + value.length],
  ];
}

function part1(inputs: string[]) {
  const symbolIndices = extractSymbolIndices(inputs, /[^\d\.]/g);
  const allowedRectangles = extractNumbers(inputs).map(allowedRectangle);
  let total = 0;
  for (const [value, [minX, minY], [maxX, maxY]] of allowedRectangles) {
    for (let x = minX; x <= maxX; x++) {
      if ((symbolIndices[x] ?? []).some((y) => y >= minY && y <= maxY)) {
        total += value;
        break;
      }
    }
  }
  return total;
}

console.log('Part 1', part1(day03Inputs));

function part2(inputs: string[]) {
  const symbolIndices = extractSymbolIndices(inputs, /\*/g);
  const allowedRectangles = extractNumbers(inputs).map(allowedRectangle);
  const productByGear: Record<number, Record<number, number>> = {};
  let total = 0;
  for (const [value, [minX, minY], [maxX, maxY]] of allowedRectangles) {
    for (let x = minX; x <= maxX; x++) {
      symbolIndices[x]?.forEach((y) => {
        if (y >= minY && y <= maxY) {
          productByGear[x] ??= {};
          productByGear[x][y] ??= 1;
          if (productByGear[x][y] !== 1) {
            total += productByGear[x][y] * value;
          }
          productByGear[x][y] *= value;
        }
      });
    }
  }
  return total;
}

console.log('Part 2', part2(day03Inputs));

import { day01Demo, day01Inputs } from "./01data.ts";

function parse(inputs: string) {
  const leftList: number[] = [];
  const rightList: number[] = [];
  for (const line of inputs.split('\n')) {
    const [left, right] = line.split(/\s+/);
    leftList.push(Number(left));
    rightList.push(Number(right));
  }
  leftList.sort();
  rightList.sort();
  return [leftList, rightList];
}

function part1(inputs: string) {
  const [leftList, rightList] = parse(inputs);
  let totalDistance = 0
  for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }
  return totalDistance;
}

console.log('Part 1:', part1(day01Inputs));

function part2(inputs: string) {
  const [leftList, rightList] = parse(inputs);
  let rightPos = 0;
  const occurrences: Record<number, number> = {};
  let totalSimilarity = 0;
  for (const value of leftList) {
    if (occurrences[value] !== undefined) {
      totalSimilarity += value * occurrences[value];
      continue;
    }
    occurrences[value] = 0;
    while (rightList[rightPos] <= value) {
      if (rightList[rightPos] === value) {
        occurrences[value]++;
      }
      rightPos++
    }
    totalSimilarity += value * occurrences[value];
  }
  return totalSimilarity;
}

console.log('Part 2:', part2(day01Inputs));
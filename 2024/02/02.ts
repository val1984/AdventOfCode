import { day02Demo, day02Inputs } from "./02data.ts";

function parse(inputs: string) {
  return inputs
    .split("\n")
    .values()
    .map((line) => line.split(" ").map(Number));
}

const INVALID = 0.1;

function signIfSafe(value1: number, value2: number) {
  const delta = value1 - value2;
  if (Math.abs(delta) <= 3 && Math.abs(delta) >= 1) {
    return Math.sign(delta);
  }
  return INVALID;
}

function isSafe(report: number[]) {
  let safe = true;
  const sign = Math.sign(report[0] - report[1]);
  for (let i = 1; safe && i < report.length; i++) {
    safe = signIfSafe(report[i - 1], report[i]) === sign;
  }
  return safe;
}

function part1(inputs: string) {
  const reports = parse(inputs);
  let safeReportsCount = 0;
  for (const report of reports) {
    if (isSafe(report)) {
      safeReportsCount++;
    }
  }
  return safeReportsCount;
}

console.log("Part 1:", part1(day02Inputs));

function* generatePermutations(report: number[]) {
  for (let i = 0; i < report.length; i++) {
    yield report.filter((_val, pos) => pos !== i);
  }
}

function part2(inputs: string) {
  const reports = parse(inputs);
  let safeReportsCount = 0;
  for (const report of reports) {
    if (isSafe(report) || generatePermutations(report).some(isSafe)) {
      safeReportsCount++;
    }
  }
  
  return safeReportsCount;
}

console.log("Part 2:", part2(day02Inputs));

import { zip } from "../../utils/iterator.ts";
import { day02Demo, day02Inputs } from "./02data.ts";

function parse(inputs: string) {
  return inputs
    .split("\n")
    .values()
    .map((line) => line.split(" ").map(Number));
}

function countIf<T>(predicate: (value: T) => boolean) {
  return function countIfReducer(previous: number, value: T) {
    if (predicate(value)) {
      return previous + 1;
    }
    return previous;
  };
}

function isSafe(report: number[]) {
  const sign = Math.sign(report[0] - report[1]);
  return zip(
    report.values().take(report.length - 1),
    report.values().drop(1)
  ).every(([x, y]) => {
    const delta = x - y;
    const absDelta = Math.abs(delta);
    return Math.sign(delta) === sign && absDelta >= 1 && absDelta <= 3;
  });
}

function part1(inputs: string) {
  const reports = parse(inputs);
  return reports.reduce(countIf(isSafe), 0);
}

console.log("Part 1:", part1(day02Inputs));

function* generatePermutations(report: number[]) {
  yield report;
  for (let i = 0; i < report.length; i++) {
    yield report.filter((_val, pos) => pos !== i);
  }
}

function part2(inputs: string) {
  const reports = parse(inputs);
  return reports.reduce(
    countIf((report) => generatePermutations(report).some(isSafe)),
    0
  );
}

console.log("Part 2:", part2(day02Inputs));

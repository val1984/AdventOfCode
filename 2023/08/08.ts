import { computeLcm } from "../../utils/number";
import { day08Input } from "./08data";

const linePatternRegex = /(.{3}) \= \((.{3}), (.{3})\)$/;
function readTree(flatTree: string) {
  const tree: Record<string, string[]> = {};
  flatTree.split("\n").forEach((line) => {
    const [, origin, ...destinations] = linePatternRegex.exec(line)!;
    tree[origin] = destinations;
  });
  return tree;
}

function part1(input: string) {
  const [instructions, flatTree] = input.split("\n\n");
  const tree = readTree(flatTree);
  let currentStep = "AAA";
  let stepCount = 0;
  while (currentStep !== "ZZZ") {
    const instruction = instructions[stepCount++ % instructions.length];
    currentStep = tree[currentStep][instruction === "L" ? 0 : 1];
  }
  return stepCount;
}

console.log('Part 1', part1(day08Input));


function part2(input: string) {
  const [instructions, flatTree] = input.split("\n\n");
  const tree = readTree(flatTree);
  let startingPoints = Object.keys(tree).filter((step) => step.endsWith("A"));
  const cycleLengths = startingPoints.flatMap((startingPoint) => {
    let currentStep = startingPoint;
    let count = 0;
    while (!currentStep.endsWith("Z")) {
      const instruction = instructions[count++ % instructions.length];
      const newStep = tree[currentStep][instruction === "L" ? 0 : 1];
      currentStep = newStep;
    }
    return count;
  });
  return computeLcm(cycleLengths);
}

console.log('Part 2', part2(day08Input));

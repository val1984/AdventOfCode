import { day08Input } from "./08data";

const linePatternRegex = /(.{3}) \= \((.{3}), (.{3})\)$/;
function readTree(flatTree: string) {
  const tree: Record<string, string[]> = {};
  flatTree.split("\n").forEach(line => {
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

console.log(part1(day08Input));

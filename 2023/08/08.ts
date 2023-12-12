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

function isPrime(primes: number[], value: number) {
  const maxDivider = Math.sqrt(value);
  for (const prime of primes) {
    if (prime > maxDivider) {
      return true;
    } else if (value % prime === 0) {
      return false;
    }
  }
}

function* primeGenerator() {
  const primes = [2];
  yield 2;
  let nextCandidate = 3;
  while (true) {
    yield nextCandidate;
    primes.push(nextCandidate);
    nextCandidate += 2;
    while (!isPrime(primes, nextCandidate)) {
      nextCandidate += 2;
    }
  }
}

function computePrimeFactors(value: number) {
  let remainder = value;
  let primes: Record<number, number> = {};
  let primeGen = primeGenerator();
  while (remainder !== 1) {
    const prime = primeGen.next().value!;
    while (remainder % prime === 0) {
      remainder = remainder / prime;
      primes[prime] ??= 0;
      primes[prime]++;
    }
  }
  return primes;
}

function computeLcm(numbers: number[]) {
  const commonFactors = numbers.map(computePrimeFactors).reduce(
    (acc: Record<string, number>, primes) => {
      Object.entries(primes).forEach(([prime, count]) => {
        acc[prime] = Math.max(acc[prime] ?? 0, count);
      });
      return acc;
    },
    {}
  );
  return Object.entries(commonFactors).reduce(
    (product, [prime, count]) => product * Number(prime) ** count,
    1
  );
}

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

import { day07Demo, day07Inputs } from "./07data.ts";

function parse(inputs: string) {
  return inputs.split("\n").map((line) => {
    const [target, values] = line.split(": ");
    return [Number(target), values.split(" ").map(Number)] as const;
  });
}

function isTargetAchievable(
  target: number,
  [head, ...tail]: readonly number[]
): boolean {
  for (let c = 0; c < 2 ** tail.length; c++) {
    const comb = tail.reduce((total, value, index) => {
      if ((c & (2 ** index)) === 0) {
        return total * value;
      }
      return total + value;
    }, head);
    if (comb === target) {
      return true;
    }
  }
  return false;
}

function part1(inputs: string) {
  const problems = parse(inputs);
  return problems.reduce((total, [target, values]) => {
    if (isTargetAchievable(target, values)) {
      return target + total;
    }
    return total;
  }, 0);
}

console.log(part1(day07Inputs));

function* computeCombination(
  values: readonly number[]
): Generator<number> {
  if (values.length <= 1) {
    yield values[0];
    return;
  }
  const tail = values[values.length - 1];
  const head = values.slice(0, -1);
  for (const value of computeCombination(head)) {
    yield tail * value;
    yield tail + value;
    yield value * (10 ** tail.toString().length) + tail;
  }
}

function part2(inputs: string) {
  const problems = parse(inputs);
  return problems.reduce((total, [target, values]) => {
    for (const comb of computeCombination(values)) {
      if (target === comb) {
        return total + target
      }
    }
    return total;
  }, 0);
}

console.log(part2(day07Inputs));

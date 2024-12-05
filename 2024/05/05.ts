import { day05Demo, day05Inputs } from "./05data.ts";

function parse(inputs: string) {
  const [rulesList, manualsList] = inputs
    .split("\n\n")
    .map((text) => text.split("\n"));
  const rules: Record<number, number[]> = {};
  for (const rule of rulesList) {
    const [x, y] = rule.split("|").map(Number);
    rules[x] ??= [];
    rules[x].push(y);
  }
  const manuals = manualsList.map((manual) => manual.split(",").map(Number));
  return [rules, manuals] as const;
}

function part1(inputs: string) {
  const [rules, manuals] = parse(inputs);
  let middlePageTotal = 0;
  for (const manual of manuals) {
    const previousPages: number[] = [];
    for (const page of manual) {
      const hasIncorrectPageOrder = rules[page]?.some((rule) =>
        previousPages.some((prev) => prev === rule)
      );
      if (hasIncorrectPageOrder) {
        break;
      }
      previousPages.push(page);
    }
    if (previousPages.length === manual.length) {
      middlePageTotal += manual[Math.floor(manual.length / 2)];
    }
  }
  return middlePageTotal;
}

console.log(part1(day05Inputs));

function makeSorter(rules: Record<number, number[]>) {
  return function sorter(x: number, y: number) {
    const rule = rules[x];
    if (rule?.includes(y)) {
      return -1;
    }
    return 0;
  };
}

function part2(inputs: string) {
  const [rules, manuals] = parse(inputs);
  const sorter = makeSorter(rules);
  let middlePageTotal = 0;
  for (const manual of manuals) {
    const visitedPages: number[] = [];
    let isIncorrect = false;
    for (const page of manual) {
      const hasViolatedRule = rules[page]?.some((rule) =>
        visitedPages.some((prev) => prev === rule)
      );
      isIncorrect = hasViolatedRule || isIncorrect;
      visitedPages.push(page);
    }
    if (isIncorrect) {
      const sorted = manual.sort(sorter);
      middlePageTotal += sorted[Math.floor(sorted.length / 2)];
    }
  }
  return middlePageTotal;
}

console.log(part2(day05Inputs));

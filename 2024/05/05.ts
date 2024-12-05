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


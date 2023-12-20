import { day19Demo, day19Input } from "./19data.ts";

type Rating = Record<string, number>;

type RatingPredicate = (rating: Rating) => boolean;

interface ExecutableRule {
  matches: RatingPredicate;
  outcome: string;
}

const workflowRulesRegex = /^(\w+)\{(.*)\}$/;
const ruleRegex = /^(\w)(.)(\d+):(\w+)$/;

function isApproved(outcome: string) {
  return outcome === "A";
}

function isRejected(outcome: string) {
  return outcome === "R";
}

function parseWorkflows(workflowsText: string) {
  const workflows: Record<string, ExecutableRule[]> = {};
  for (const workflowText of workflowsText.split("\n")) {
    const [, name, rulesText] = workflowRulesRegex.exec(workflowText)!;
    const ruleStrings = rulesText.split(",");
    const outcome = ruleStrings.pop()!;
    workflows[name] = ruleStrings.map((ruleString) => {
      const [, parameter, comparison, valueString, outcome] =
        ruleRegex.exec(ruleString)!;
      const value = Number(valueString);
      const matches: RatingPredicate =
        comparison === ">"
          ? (rating) => rating[parameter] > value
          : (rating) => rating[parameter] < value;
      return {
        matches,
        outcome,
      };
    });
    workflows[name].push({ matches: () => true, outcome });
  }
  return workflows;
}

function parseRatings(ratingsText: string) {
  return ratingsText
    .replace(/[\{\}]/g, "")
    .split("\n")
    .map((line) =>
      Object.fromEntries(
        line.split(",").map((parameterText) => {
          const [parameter, value] = parameterText.split("=");
          return [parameter, Number(value)] as const;
        })
      )
    );
}

function computeScore(
  workflows: Record<string, ExecutableRule[]>,
  rating: Rating
) {
  let currentWorkflow = "in";
  while (true) {
    const rules = workflows[currentWorkflow];
    for (const { matches, outcome } of rules) {
      if (matches(rating)) {
        if (isApproved(outcome)) {
          return Object.values(rating).reduce((sum, value) => sum + value, 0);
        } else if (isRejected(outcome)) {
          return 0;
        } else {
          currentWorkflow = outcome;
          break;
        }
      }
    }
  }
}

function part1(input: string) {
  const [workflowsText, ratingsText] = input.split("\n\n");
  const workflows = parseWorkflows(workflowsText);
  const ratings = parseRatings(ratingsText);
  return ratings.reduce(
    (total, rating) => total + computeScore(workflows, rating),
    0
  );
}

console.log("Part 1", part1(day19Input));

interface Rule {
  parameter: Parameter;
  comparison: ">" | "<";
  value: number;
  outcome: string;
}

function parseRules(workflowsText: string) {
  const rules: Record<string, [string, ...Rule[]]> = {};
  for (const workflowText of workflowsText.split("\n")) {
    const [, name, rulesText] = workflowRulesRegex.exec(workflowText)!;
    const ruleStrings = rulesText.split(",");
    const otherwise = ruleStrings.pop()!;
    rules[name] = [
      otherwise,
      ...ruleStrings.map((ruleString): Rule => {
        const [, parameter, comparison, valueString, outcome] =
          ruleRegex.exec(ruleString)!;
        const value = Number(valueString);
        return {
          parameter,
          comparison,
          value,
          outcome,
        } as Rule;
      }),
    ];
  }
  return rules;
}

type Parameter = "x" | "m" | "a" | "s";
type Span = [from: number, to: number];

type RatingSpan = Record<Parameter, Span>;

function computePossibilities(
  workflows: Record<string, [string, ...Rule[]]>,
  ratingSpan: RatingSpan,
  name = "in"
): number {
  if (isRejected(name)) {
    return 0;
  }
  if (isApproved(name)) {
    return Object.values(ratingSpan).reduce(
      (acc, [lo, hi]) => acc * (hi - lo + 1),
      1
    );
  }
  const [otherwise, ...rules] = workflows[name];
  let total = 0;
  let currentSpan = ratingSpan;
  for (const { parameter, comparison, value, outcome } of rules) {
    const [low, high] = currentSpan[parameter];
    let trueRange: Span, falseRange: Span;
    if (comparison === "<") {
      trueRange = [low, value - 1];
      falseRange = [value, high];
    } else {
      trueRange = [value + 1, high];
      falseRange = [low, value];
    }
    if (trueRange[0] <= trueRange[1]) {
      total += computePossibilities(
        workflows,
        { ...currentSpan, [parameter]: trueRange },
        outcome
      );
    }
    if (falseRange[0] <= falseRange[1]) {
      currentSpan = { ...currentSpan, [parameter]: falseRange };
    } else {
      break;
    }
  }
  if (Object.values(currentSpan).every(([low, high]) => low <= high)) {
    total += computePossibilities(workflows, currentSpan, otherwise);
  }
  return total;
}

function part2(input: string) {
  const [workflowsText] = input.split("\n\n");
  const workflows = parseRules(workflowsText);
  const ratingSpan: RatingSpan = {
    x: [1, 4_000],
    m: [1, 4_000],
    a: [1, 4_000],
    s: [1, 4_000],
  };
  return computePossibilities(workflows, ratingSpan);
}

console.log("Part 2", part2(day19Input));

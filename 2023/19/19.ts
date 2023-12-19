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
  parameter: string;
  comparison: ">" | "<";
  value: number;
  outcome: string;
}

function parseRules(workflowsText: string) {
  const rules: Record<string, (Rule | string)[]> = {};
  for (const workflowText of workflowsText.split("\n")) {
    const [, name, rulesText] = workflowRulesRegex.exec(workflowText)!;
    const ruleStrings = rulesText.split(",");
    const otherwise = ruleStrings.pop()!;
    rules[name] = [
      ...ruleStrings.map((ruleString): Rule => {
        const [, parameter, comparison, valueString, outcome] =
          ruleRegex.exec(ruleString)!;
        const value = Number(valueString);
        return {
          parameter,
          comparison: comparison === ">" ? ">" : "<",
          value,
          outcome,
        };
      }),
      otherwise,
    ];
  }
  return rules;
}

type Parameter = "x" | "m" | "a" | "s";
type Span = [from: number, to: number];

type RatingSpan = Record<Parameter, Span>;

function part2(input: string) {
  const [workflowsText] = input.split("\n\n");
  const rules = parseRules(workflowsText);
  const ratingSpans: RatingSpan[] = [
    {
      x: [1, 4_000],
      m: [1, 4_000],
      a: [1, 4_000],
      s: [1, 4_000],
    },
  ];
  return rules;
}

console.log("Part 2", part2(day19Demo));

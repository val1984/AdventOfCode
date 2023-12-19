import { day19Demo, day19Input } from "./19data.ts";

type RatingPredicate = (rating: Record<string, number>) => boolean;

interface Rule {
  matches: RatingPredicate;
  outcome: string;
}

interface Workflow {
  rules: Rule[];
  otherwise: string;
}

const workflowRulesRegex = /^(\w+)\{(.*)\}$/;
const ruleRegex = /^(\w)(.)(\d+):(\w+)$/;

function isApproved(outcome: string) {
  return outcome === "A";
}

function isRejected(outcome: string) {
  return outcome === "R";
}

function part1(input: string) {
  const [workflowsText, ratingsText] = input.split("\n\n");
  const workflows: Record<string, Workflow> = {};
  for (const workflowText of workflowsText.split("\n")) {
    const [, name, rulesText] = workflowRulesRegex.exec(workflowText)!;
    const ruleStrings = rulesText.split(",");
    const otherwise = ruleStrings.pop()!;
    workflows[name] = {
      rules: ruleStrings.map((ruleString) => {
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
      }),
      otherwise,
    };
  }
  const ratings = ratingsText
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
  return ratings.reduce((total, rating) => {
    let currentWorkflow = "in";
    while (true) {
      const wf = currentWorkflow;
      const { rules, otherwise } = workflows[wf];
      for (const { matches, outcome } of rules) {
        if (matches(rating)) {
          if (isApproved(outcome)) {
            return Object.values(rating).reduce(
              (sum, value) => sum + value,
              total
            );
          } else if (isRejected(outcome)) {
            return total;
          } else {
            currentWorkflow = outcome;
            break;
          }
        }
      }
      if (wf !== currentWorkflow) {
        continue;
      }
      if (isApproved(otherwise)) {
        return Object.values(rating).reduce((sum, value) => sum + value, total);
      } else if (isRejected(otherwise)) {
        return total;
      } else {
        currentWorkflow = otherwise;
      }
    }
  }, 0);
}

console.log("Part 1", part1(day19Input));

function part2(input: string) {
  const [workflowsText] = input.split("\n\n");
  return workflowsText;
}

console.log("Part 2", part2(day19Demo));

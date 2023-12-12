import { day12Demo, day12Input } from "./12data.js";

const multipleWorkingRegex = /\.+/g;
function extractInput(input: string) {
  return input.split("\n").map((line): [string, number[]] => {
    const [springs, groupsInput] = line.split(" ");
    const groups = groupsInput.split(",").map(Number);
    return [springs.replace(multipleWorkingRegex, " ").trim(), groups];
  });
}

function computePossibilities(springs: string, groups: number[]) {
  const groupsLength = groups.reduce(
    (total, group, index) => total + group + (index === 0 ? 0 : 1),
    0
  );
  // console.log("Line", lineIndex + 1);
  if (groupsLength === springs.length) {
    // console.log(1);
    // Easiest case: as many damaged + healthy as unknown + damaged + healthy
    return 1;
  }
  const springsGroups = springs.split(" ");
  if (springsGroups.length === groups.length) {
    const combinations = springsGroups.reduce((acc, group, index) => {
      return acc * (group.length - groups[index] + 1);
    }, 1);
    // console.log(combinations);
    // A bit more tricky: as many groups on both sides
    return combinations;
  }

  if (springs.startsWith("#")) {
    return computePossibilities(
      springs.substring(groups[0] + 1),
      groups.slice(1)
    );
  }

  if (springs.endsWith("#")) {
    return computePossibilities(
      springs.substring(0, -groups.at(-1)! - 1),
      groups.slice(0, -1)
    );
  }
  return 1;
}

function part1(input: string) {
  const springsData = extractInput(input);
  return springsData.reduce((total, [springs, groups], lineIndex) => {
    const possibilities = computePossibilities(springs, groups);
    console.log("Line", lineIndex + 1, springs, groups, possibilities);
    return total + possibilities;
  }, 0);
}

console.log("Part 1", part1(day12Demo));

// function part2(input: string) {
//   return input;
// }

// console.log("Part 2", part2(day12Demo));

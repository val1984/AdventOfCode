import { day12Demo, day12Input } from "./12data.js";

const multipleWorkingRegex = /\.+/g;
function extractInput(input: string) {
  return input.split("\n").map((line): [string, number[]] => {
    const [springs, groupsInput] = line.split(" ");
    const groups = groupsInput.split(",").map(Number);
    return [springs.replace(multipleWorkingRegex, " ").trim(), groups];
  });
}

const allDamagedRegex = /^#+$/;
const allUnknownRegex = /^\?+$/;

function computePossibilities(
  springs: string,
  groups: number[],
  lineNumber?: number
) {
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

  if (allDamagedRegex.test(springs.substring(1, groups[0] + 1))) {
    return computePossibilities(
      springs.substring(groups[0] + 2),
      groups.slice(1),
      lineNumber
    );
  }

  if (springs.startsWith("#")) {
    return computePossibilities(
      springs.substring(groups[0] + 1),
      groups.slice(1),
      lineNumber
    );
  }

  if (allDamagedRegex.test(springs.substring(-groups.at(-1)! - 1, -1))) {
    return computePossibilities(
      springs.substring(0, groups.at(-1)! - 2),
      groups.slice(0, -1),
      lineNumber
    );
  }

  if (springs.endsWith("#")) {
    return computePossibilities(
      springs.substring(0, -1),
      [...groups.slice(0, -1), groups.at(-1)! - 1],
      lineNumber
    );
  }

  if (springs.endsWith("#?") && groups.at(-1) === 1) {
    return computePossibilities(
      springs.substring(0, -3),
      groups.slice(0, -1),
      lineNumber
    );
  }

  if (allUnknownRegex.test(springs)) {
    const emptySpacesCount =
      springs.length - groups.reduce((total, group) => total + group, 0);
    let count = 1;
    for (let i = emptySpacesCount; i > 1; i--) {
      count += i;
    }
    return count; // ##.#... ##..#.. ##...#. ##....# .##.#.. .##..#. .##...# ..##.#. ..##..# ...##.#
  }

  console.log(
    "Unhandled case at line",
    lineNumber,
    springs,
    groups,
    springs.substring(1, groups[0] + 1)
  );

  return 1;
}

function bruteForceComputePossibilities(
  springs: string,
  groupLengths: number[]
) {
  console.log(springs);
  let damaged;
  damaged = springs.replace(/[\?\#]/g, "1").replace(/ /g, "0");
  console.log(damaged);
  damaged = parseInt(damaged, 2);
  let unknown;
  unknown = springs.replace(/\?/g, "1").replace(/[ \#]/g, "0");
  console.log(unknown);
  unknown = parseInt(unknown, 2);
  console.log(damaged, unknown, groupLengths);
  let total = 0;
  for (let candidate = 1; candidate <= damaged; candidate++) {
    if ((candidate & damaged) === candidate) {
      let i = 0;
      while (candidate >> i) {
        break;
      }
      total++;
    }
  }
  return total;
}

function part1(input: string) {
  const springsData = extractInput(input);
  return springsData.reduce((total, [springs, groups], lineIndex) => {
    const possibilities = bruteForceComputePossibilities(springs, groups);
    // console.log("Line", lineIndex + 1, springs, groups, possibilities);
    return total + possibilities;
  }, 0);
}

console.log("Part 1", part1(day12Demo));

// function part2(input: string) {
//   return input;
// }

// console.log("Part 2", part2(day12Demo));

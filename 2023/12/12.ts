import { day12Demo, day12Input } from './12data.js'

function extractInput(input: string) {
  return input.split('\n').map((line): [string, number[]] => {
    const [springs, groupsInput] = line.split(' ');
    const groups = groupsInput.split(',').map(Number);
    return [springs, groups];
  });
}

const missingDataSpotsRegex = /(\?+)/g;
function findMissingDataSpots(springs: string) {
  return Array.from(springs.matchAll(missingDataSpotsRegex)).map(([, match]) => match.length);
}

function part1(input: string) {
  const springsData = extractInput(input);
  return springsData.reduce((total, [springs, groups]) => {
    console.log(findMissingDataSpots(springs), groups);
    return total;
  }, 0);
}

console.log("Part 1", part1(day12Demo));

// function part2(input: string) {
//   return input;
// }

// console.log("Part 2", part2(day12Demo));
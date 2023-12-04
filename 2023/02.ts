import { inputs } from "./02data";

function findMinimumNumberOfDices(input: string[]) {
  return input.map(value => {
    const rgb: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (const run of value.split('; ')) {
      for (const colorSplit of run.split(', ')) {
        const [amount, color] = colorSplit.split(' ');
        if (rgb[color] < Number(amount)) {
          rgb[color] = Number(amount);
        }
      }
    }
    return rgb;
  });
}

function part1(input: string[]) {
  const minDices = findMinimumNumberOfDices(input);
  return minDices.reduce((acc, {red, green, blue}, index) => {
    if (red <= 12 && green <= 13 && blue <= 14) {
      return acc + index;
    } else {
      return acc;
    }
  }, 0);
}

console.log('Part 1', part1(inputs));

function part2(input: string[]) {
  const minDices = findMinimumNumberOfDices(input);
  return minDices.reduce((acc, {red, green, blue}) => {
    return acc + red * green * blue;
  }, 0);
}

console.log('Part 2', part2(inputs));
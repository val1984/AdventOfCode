import { inputs } from "./01data";

function part1(inputs: string[]) {
  return inputs.reduce((acc, input) => {
    const matches = [...input.matchAll(/\d/g)];
    const firstNumber = matches.at(0);
    const lastNumber = matches.at(-1);
    const num = `${firstNumber}${lastNumber}`;
    return acc + Number(num);
  }, 0);
}

console.log(part1(inputs));

const numberRegex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
const wordToDigit: Record<string, string | undefined> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};
function getActualDigit(value: string) {
  return wordToDigit[value] ?? value;
}

function part2(inputs: string[]) {
  return inputs.reduce((acc, input) => {
    const matches = [...input.matchAll(numberRegex)];
    const firstNumber = matches.at(0)![1];
    const lastNumber = matches.at(-1)![1];
    const num = `${getActualDigit(firstNumber)}${getActualDigit(lastNumber)}`;
    return acc + Number(num);
  }, 0);
}

console.log(part2(inputs));
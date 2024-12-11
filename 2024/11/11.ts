import { day11Demo, day11Inputs } from "./11data.ts";

function applyRules(stone: number) {
  switch (true) {
    case stone === 0:
      return [1];
    case Math.floor(Math.log10(stone)) % 2 === 1:
      const stoneStr = stone.toString();
      return [
        stoneStr.substring(0, stoneStr.length / 2),
        stoneStr.substring(stoneStr.length / 2),
      ].map(Number);
    default:
      return [stone * 2024];
  }
}

function part1(inputs: string) {
  const stones = inputs.split(" ").map(Number);
  let nextStones = [...stones];
  for (let i = 0; i < 25; i++) {
    nextStones = nextStones.flatMap(applyRules);
  }
  return nextStones.length;
}

console.log(part1(day11Inputs));

let cache: Record<`${number}-${number}`, number> = {};

function blink(stone: number, blinks: number): number {
  const key = `${stone}-${blinks}` as const;
  if (cache[key] !== undefined) {
    return cache[key];
  }
  if (blinks === 0) {
    return 1;
  }
  if (stone === 0) {
    const value = blink(1, blinks - 1);
    cache[key] = value;
    return value;
  }
  const str = stone.toString();
  if (str.length % 2 === 0) {
    const value = blink(Number(str.substring(0, str.length / 2)), blinks - 1) + blink(Number(str.substring(str.length / 2)), blinks - 1);
    cache[key] = value;
    return value;
  }
  const value = blink(2024 * stone, blinks - 1);
  cache[key] = value;
  return value;
}

function part2(inputs: string) {
  const stones = inputs.split(" ").map(Number);
  return stones.reduce((acc, stone) => acc + blink(stone, 75), 0);
}

console.log(part2(day11Inputs));

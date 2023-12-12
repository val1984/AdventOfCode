import { day06Input } from "./06data.js";

function computeWinningRaces(time: number, distance: number) {
  let winningRaces = 0;
  for (let speed = 1; speed < time; speed++) {
    if ((time - speed) * speed > distance) {
      winningRaces++;
    }
  }
  return winningRaces;
}

function part1(input: string) {
  const [times, distances] = input.split('\n').map(line => line.split(/\s+/).map(Number));
  return times.reduce((product, time, index) => {
    const distance = distances[index];
    const winningRaces = computeWinningRaces(time, distance);
    return product * winningRaces;
  }, 1);
}

console.log('Part 1', part1(day06Input));

function part2(input: string) {
  const [time, distance] = input.split('\n').map(line => Number(line.replace(/\s+/g, '')));
  console.log(time, distance)
  return computeWinningRaces(time, distance);
}

console.log('Part 2', part2(day06Input));
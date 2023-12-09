import { day09Demo, day09Input } from "./09data";

function computeHistoryDeltas(history: number[]) {
  const deltas: number[] = [];
  for (let i = 1; i < history.length; i++) {
    deltas.push(history[i] - history[i - 1]);
  }
  return deltas;
}

function computeHistoryNextValue(deltaIterations: number[][]): number {
  return deltaIterations.reduceRight((previousLineValue, deltas) => {
    return deltas.at(-1)! + previousLineValue;
  }, 0);
}

function part1(input: string) {
  const lines = input.split('\n');
  const histories = lines.map(line => line.split(' ').map(Number));
  return histories.reduce((total, history) => {
    const deltaIterations = [history];
    while (true) {
      const nextDeltas = computeHistoryDeltas(deltaIterations.at(-1)!);
      if (nextDeltas.every(value => value === 0)) {
        break;
      }
      deltaIterations.push(nextDeltas);
    }
    return total + computeHistoryNextValue(deltaIterations);
  }, 0);
}

console.log(part1(day09Input));

function computeHistoryPreviousValue(deltaIterations: number[][]): number {
  return deltaIterations.reduceRight((previousLineValue, deltas) => {
    return deltas.at(0)! - previousLineValue;
  }, 0);
}

function part2(input: string) {
  const lines = input.split('\n');
  const histories = lines.map(line => line.split(' ').map(Number));
  return histories.reduce((total, history) => {
    const deltaIterations = [history];
    while (true) {
      const nextDeltas = computeHistoryDeltas(deltaIterations.at(-1)!);
      if (nextDeltas.every(value => value === 0)) {
        break;
      }
      deltaIterations.push(nextDeltas);
    }
    return total + computeHistoryPreviousValue(deltaIterations);
  }, 0);
}

console.log(part2(day09Input));

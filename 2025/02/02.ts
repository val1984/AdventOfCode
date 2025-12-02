import { readFile } from 'node:fs/promises';

async function readInputs(fileName: string) {
  const contents = await readFile(fileName, 'utf-8');
  return contents.split('\n');
}

function step1(values: readonly string[] = []) {
  return values.reduce((acc, val) => acc + invalidSum(val), 0);
}

function step2(values: readonly string[] = []) {
  return values.reduce((acc, val) => acc + invalidSum2(val), 0);
}

function invalidSum(value: string) {
  const [lower, upper] = value.split('-').map(Number);
  return range(lower, upper).filter(value => {
    const stringed = value.toString();
    return isRepeating(stringed, stringed.length / 2);
  }).reduce((acc, value) => acc + value, 0);
}

function invalidSum2(value: string) {
  const [lower, upper] = value.split('-').map(Number);
  return range(lower, upper).filter(value => {
    const stringed = value.toString();
    return range(1, stringed.length / 2).some(len => isRepeating(stringed, len));
  }).reduce((acc, value) => acc + value, 0);
}

function isRepeating(value: string, chunkLength: number) {
  if (value.length % chunkLength !== 0) {
    return false;
  }
  const first = value.substring(0, chunkLength);
  for (let k = chunkLength; k < value.length; k += chunkLength) {
    if (value.indexOf(first, k) !== k) {
      return false;
    }
  }
  return true;
}

function* range(lower: number, upper: number) {
  for (let i = lower; i <= upper; i++) {
    yield i;
  }
}

const inputs = await readInputs('02inputs.txt');
const values = inputs[0].split(',');
console.log('step 1: ', step1(values));
console.log('step 2: ', step2(values));
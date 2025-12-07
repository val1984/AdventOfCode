import { readFile } from "node:fs/promises";

const demo = await readInputs("demo.txt");
const inputs = await readInputs("inputs.txt");
console.log("Step 1:", step1(inputs));
console.log("Step 2:", step2(inputs));

function step1(allLines: Awaited<
	ReturnType<typeof readInputs>
>) {
  const linesStr = allLines.map((line) => line.trim().split(/\s+/));
  const operands = linesStr.pop();
  if (operands === undefined) {
    throw new Error('should not happen');
  }
  const lines = linesStr.map(line => line.map(Number));
  let total = 0;
  for (let i = 0; i < operands.length; i++) {
    if (operands[i] === '*') {
      let intermediate = 1;
      for (let j = 0; j < lines.length; j++) {
        intermediate *= lines[j][i];
      }
      total += intermediate
    } else {
      for (let j = 0; j < lines.length; j++) {
        total += lines[j][i];
      }
    }
  }
  return total;
}

function step2(lines: Awaited<ReturnType<typeof readInputs>>) {
	let total = 0;
  let nums: number[] = [];
  for (let c = lines[0].length - 1; c >= 0; c--) {
    let num = '';
    for (let r = 0; r < lines.length - 1; r++) {
      const char = lines[r][c];
      if (char !== ' ') {
        num += char;
      }
    }
    const op = lines.at(-1)?.[c];
    if (num === '') {
      nums = [];
    } else {
      nums.push(Number(num));
    }
    if (op === '+') {
      total += nums.reduce(sum, 0);
    } else if (op === '*') {
      total += nums.reduce(product, 1);
    }
  }
  return total;
}

function sum(left: number, right: number) {
  return left + right;
}

function product(left: number, right: number) {
  return left * right;
}

async function readInputs(fileName: string) {
	const contents = await readFile(fileName, "utf-8");
	const lines = contents
		.split("\n");
  return lines;
}

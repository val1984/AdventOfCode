import { readFile } from "node:fs/promises";

const lines = await readInputs("03inputs.txt");
console.log("Step 1: ", step1(lines));
console.log("Step 2: ", step2(lines));

function step1(lines: string[]) {
	return lines.values().map(makeFindLargestJoltage(2)).reduce(sum, 0);
}

function step2(lines: string[]) {
	return lines.values().map(makeFindLargestJoltage(12)).reduce(sum, 0);
}

function makeFindLargestJoltage(len: number) {
	return function findLargestJoltage(bank: string): number {
		const batteries = bank.split("").map(Number);
		let joltage = "";
		let largestIndex = 0;
		for (let i = len - 1; i >= 0; i--) {
			const searchWindow = batteries.slice(largestIndex, batteries.length - i);
			const largest = Math.max(...searchWindow);
			joltage += largest;
			largestIndex += searchWindow.indexOf(largest) + 1;
		}
		return Number(joltage);
	};
}

function sum(left: number, right: number) {
	return left + right;
}

async function readInputs(fileName: string) {
	const contents = await readFile(fileName, "utf-8");
	return contents.split("\n");
}

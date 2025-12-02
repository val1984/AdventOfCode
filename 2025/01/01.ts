import { readFile } from "node:fs/promises";

const inputs = await readInput();
console.log("Part 1:", first(inputs));
console.log("Part 2:", second(inputs));

function first(inputs: string[]) {
	let dial = 50;
	let zeroHits = 0;
	for (const line of inputs) {
		const [dirChange, value] = getDirectionChange(line);
		dial = (dial + dirChange * value + 100) % 100;
		if (dial === 0) {
			zeroHits++;
		}
	}
	return zeroHits;
}

function second(inputs: string[]) {
	let dial = 50;
	let zeroHits = 0;
	for (const line of inputs) {
		const [dirChange, value] = getDirectionChange(line);
		for (let i = 0; i < value; i++) {
			dial = (dial + 100 + dirChange) % 100;
			if (dial === 0) {
				zeroHits++;
			}
		}
	}
	return zeroHits;
}

function getDirectionChange(command: string): [-1 | 1, number] {
	const dirChange = command[0] === "L" ? -1 : 1;
	const value = parseInt(command.slice(1), 10);
	return [dirChange, value];
}

async function readInput() {
	const lines = await readFile("./01data.txt", "utf-8");
	return lines.split("\n");
}

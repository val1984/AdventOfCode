import { readFile } from "node:fs/promises";

const demo = await readInputs("demo.txt");
const inputs = await readInputs("inputs.txt");
console.log("Step 1:", step1(inputs));
console.log("Step 2:", step2(inputs));

function step1([freshRanges, ingredients]: Awaited<
	ReturnType<typeof readInputs>
>) {
	const isFresh = makeIsFresh(freshRanges);
	return ingredients.filter(isFresh).length;
}

function makeIsFresh(freshRanges: number[][]) {
	return function isFresh(ingredient: number) {
		return freshRanges.some(
			([lower, upper]) => lower <= ingredient && ingredient <= upper,
		);
	};
}

function step2([freshRanges]: Awaited<ReturnType<typeof readInputs>>) {
	let total = 0;
	let lastUpperBound = 0;
	freshRanges.sort(([aLow, aUp], [bLow, bUp]) => aLow - bLow || aUp - bUp);
	for (const [lower, upper] of freshRanges) {
		if (upper <= lastUpperBound) {
			continue;
		}
		total += upper - Math.max(lower - 1, lastUpperBound);
		lastUpperBound = upper;
	}
	return total;
}

async function readInputs(fileName: string) {
	const contents = await readFile(fileName, "utf-8");
	const [freshRangesStr, ingredientsStr] = contents
		.split("\n\n")
		.map((content) => content.split("\n"));
	const freshRanges = freshRangesStr.map((line) => line.split("-").map(Number));
	const ingredients = ingredientsStr.map(Number);
	return [freshRanges, ingredients] as const;
}

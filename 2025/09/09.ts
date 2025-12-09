import { readFile } from "node:fs/promises";

type Point = [number, number];

const demo = await readInputs("demo.txt");
const inputs = await readInputs("inputs.txt");
console.log("Step 1:", step1(inputs));
// console.log("Step 2:", step2(inputs));

function step1(points: Inputs) {
	const areas = new Set<number>();
	for (let i = 0; i < points.length; i++) {
		for (let j = i + 1; j < points.length; j++) {
			areas.add(area(points[i], points[j]));
		}
	}
	// Math.max is unusable with a big array
	const sorted = [...areas].sort((a, b) => b - a);
	return sorted[0];
}

function area([ax, ay]: Point, [bx, by]: Point): number {
	return Math.abs(ax - bx + 1) * Math.abs(ay - by + 1);
}

type Inputs = Awaited<ReturnType<typeof readInputs>>;

async function readInputs(fileName: string) {
	const contents = await readFile(fileName, "utf-8");
	const lines = contents.split("\n");
	return lines.map((line) => line.split(",").map(Number) as Point);
}

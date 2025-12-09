import { readFile } from "node:fs/promises";

type Point = [number, number];

const demo = await readInputs("demo.txt");
const inputs = await readInputs("inputs.txt");
console.log("Step 1:", step1(inputs));
console.log("Step 2:", step2(inputs));

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

function step2(points: Inputs) {
	const horizontalEdgesByCol = mapValues(
		Map.groupBy(points, ([c]) => c),
		(points) => points.map(([, r]) => r),
	);
	const verticalEdgesByRow = mapValues(
		Map.groupBy(points, ([, r]) => r),
		(points) => points.map(([c]) => c),
	);

	const areaForPoints: (readonly [number, Point, Point])[] = [];
	for (let i = 0; i < points.length; i++) {
		for (let j = i + 1; j < points.length; j++) {
			areaForPoints.push([area(points[i], points[j]), points[i], points[j]]);
		}
	}
	areaForPoints.sort(([a], [b]) => b - a);

	return areaForPoints.find(([_area, [ac, ar], [bc, br]]) => {
		const intersectsWithHorizEdge = matching(horizontalEdgesByCol, (col) =>
			isBetween(ac, bc, col),
		).some(([, [r1, r2]]) => isOverlapping(r1, r2, ar, br));
		const intersectsWithVertEdge = matching(verticalEdgesByRow, (row) =>
			isBetween(ar, br, row),
		).some(([, [c1, c2]]) => isOverlapping(c1, c2, ac, bc));
		const filtered = intersectsWithHorizEdge || intersectsWithVertEdge;
		return !filtered;
	})?.[0];
}

function mapValues<K, V1, V2>(
	map: Map<K, V1>,
	transformValue: (value: V1, key: K) => V2,
) {
	const transformedMap = new Map<K, V2>();
	for (const [key, value] of map.entries()) {
		transformedMap.set(key, transformValue(value, key));
	}
	return transformedMap;
}

function matching<K, V>(map: Map<K, V>, keyPredicate: (key: K) => boolean) {
	return map.entries().filter(([key]) => keyPredicate(key));
}

function isBetween(bound1: number, bound2: number, value: number) {
	const min = Math.min(bound1, bound2);
	const max = Math.max(bound1, bound2);
	return min < value && value < max;
}

function isOverlapping(
	start1: number,
	end1: number,
	start2: number,
	end2: number,
) {
	const min1 = Math.min(start1, end1);
	const max1 = Math.max(start1, end1);
	const min2 = Math.min(start2, end2);
	const max2 = Math.max(start2, end2);
	return !(max2 <= min1 || max1 <= min2);
}

function area([ax, ay]: Point, [bx, by]: Point): number {
	return (Math.abs(ax - bx) + 1) * (Math.abs(ay - by) + 1);
}

type Inputs = Awaited<ReturnType<typeof readInputs>>;

async function readInputs(fileName: string) {
	const contents = await readFile(fileName, "utf-8");
	const lines = contents.split("\n");
	return lines.map((line) => line.split(",").map(Number) as Point);
}

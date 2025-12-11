import { readFile } from "node:fs/promises";

const demo = await readInputs("demo.txt");
const inputs = await readInputs("inputs.txt");
console.log("Step 1:", step1(inputs));
// console.log("Step 2:", step2(inputs));

function step1(graph: Graph) {
	return visit(graph, "you", "out").reduce(sum, 0);
}

function* visit(
	graph: Graph,
	from: string,
	destination: string,
	cache = new Map<string, number>(),
): Generator<number> {
	const cached = cache.get(from);
	if (cached) {
		yield cached;
	} else if (from === destination) {
		yield 1;
	} else {
		const tos = graph.get(from);
		if (tos) {
			for (const to of tos) {
				const result = visit(graph, to, destination, cache).reduce(sum, 0);
				cache.set(to, result);
				yield result;
			}
		}
	}
}

function sum(left: number, right: number) {
	return left + right;
}

type Graph = Awaited<ReturnType<typeof readInputs>>;

async function readInputs(fileName: string) {
	const contents = await readFile(fileName, "utf-8");
	const graph = new Map<string, Set<string>>();
	contents.split("\n").forEach((line) => {
		const [from, tos] = line.split(": ");
		graph.set(from, new Set(tos.split(" ")));
	});
	return graph;
}

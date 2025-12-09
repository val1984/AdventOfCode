import { readFile } from "node:fs/promises";

const demo = await readInputs("demo.txt");
const inputs = await readInputs("inputs.txt");
console.log("Step 1:", step1(inputs));
console.log("Step 2:", step2(inputs));

function step1(points: Inputs) {
	const smallestEdges = sortEdgesByDistanceAsc(points);
	const circuits = new Set<Set<Point>>();
	let count = 0;
	for (const edge of smallestEdges) {
    let newEdge = new Set(edge);
    count++;
    if (circuits.values().some(circuit => newEdge.isSubsetOf(circuit))) {
      continue;
    }
    for (const circuit of circuits.values().filter(circuit => !newEdge.isDisjointFrom(circuit))) {
      circuits.delete(circuit);
      newEdge = newEdge.union(circuit);
    }
		circuits.add(newEdge);
		if (count >= 1000) {
			break;
		}
	}
	return circuits
    .values()
		.map((list) => list.size)
    .toArray()
		.sort((a, b) => b - a)
		.values()
		.take(3)
    .toArray()
		.reduce(product, 1);
}

function step2(points: Inputs) {
	const smallestEdges = sortEdgesByDistanceAsc(points);
	const circuits = new Set<Set<Point>>();
	for (const edge of smallestEdges) {
    let newEdge = new Set(edge);
    if (circuits.values().some(circuit => newEdge.isSubsetOf(circuit))) {
      continue;
    }
    for (const circuit of circuits.values().filter(circuit => !newEdge.isDisjointFrom(circuit))) {
      circuits.delete(circuit);
      newEdge = newEdge.union(circuit);
    }
		circuits.add(newEdge);
		if (circuits.size === 1 && [...circuits.values()][0].size === points.length) {
      const [[ax], [bx]] = edge;
			return ax * bx
		}
	}
}

class UnionJoint {
  private circuits = new Set<Set<Point>>;

  addEdge(a: Point, b: Point) {
    if (this.hasEdge(a, b)) {
      return;
    }
    let edge = new Set([a, b]);
    for (const circuit of this.circuits.values().filter(circuit => !edge.isDisjointFrom(circuit))) {
      this.circuits.delete(circuit);
      edge = edge.union(circuit);
    }
    this.circuits.add(edge);
  }

  hasEdge(a: Point, b: Point) {
    const edge = new Set([a, b]);
    return this.circuits.values().some(group => edge.isSubsetOf(group));
  }

  values() {
    return this.circuits.values();
  }
}

function sortEdgesByDistanceAsc(points: Point[]) {
  const distances = new Map<number, [Point, Point]>();
	for (let i = 0; i < points.length; i++) {
		const a = points[i];
		for (let j = i + 1; j < points.length; j++) {
			const b = points[j];
			distances.set(distance(a, b), [a, b]);
		}
	}
	const smallestEdges = [...distances.keys()]
		.sort((a, b) => a - b)
		.values()
		.map((dist) => distances.get(dist))
		.filter((x) => x !== undefined);
  return smallestEdges;
}

function distance([ax, ay, az]: Point, [bx, by, bz]: Point) {
	return (ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2;
}

function product(left: number, right: number) {
	return left * right;
}

type Point = [x: number, y: number, z: number];

type Inputs = Awaited<ReturnType<typeof readInputs>>;

async function readInputs(fileName: string) {
	const contents = await readFile(fileName, "utf-8");
	const lines = contents
		.split("\n")
		.map((line) => line.split(",").map(Number) as Point);
	return lines;
}

import { readFile } from "node:fs/promises";

const demo = await readInputs("demo.txt");
const inputs = await readInputs("inputs.txt");
console.log("Step 1:", step1(inputs));
console.log("Step 2:", step2(inputs));

function step1(lines: Awaited<
	ReturnType<typeof readInputs>
>) {
  const startRow = lines.findIndex(line => line.includes('S'));
  const startCol = lines[startRow].indexOf('S');
  const beams = new Set([startCol]);
  let total = 0;
  for (let r = startRow + 1; r < lines.length; r++) {
    const currentBeams = new Set(beams);
    for (const beam of currentBeams) {
      if (lines[r][beam] === '^') {
        beams.delete(beam);
        beams.add(beam - 1);
        beams.add(beam + 1);
        total++;
      }
    }
  }
  return total;
}

function step2(lines: Awaited<ReturnType<typeof readInputs>>) {
  const startRow = lines.findIndex(line => line.includes('S'));
  const startCol = lines[startRow].indexOf('S');
  let beams: number[] = [];
  beams[startCol] = 1;
  for (const line of lines.slice(startRow + 1)) {
    const nextBeams: number[] = [];
    // We operate on a sparse array
    beams.forEach((beam, c) => {
      if (line[c] === '^') {
        incBy(nextBeams, c - 1, beam);
        incBy(nextBeams, c + 1, beam);
      } else {
        incBy(nextBeams, c, beam);
      }
    });
    beams = nextBeams;
  }
  return beams.reduce(sum, 0);
}

function incBy(line: number[], col: number, increment: number) {
  line[col] ??= 0;
  line[col] += increment
}

function sum(left: number, right: number) {
  return left + right;
}

async function readInputs(fileName: string) {
	const contents = await readFile(fileName, "utf-8");
	const lines = contents
		.split("\n");
  return lines;
}

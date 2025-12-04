import { readFile } from "node:fs/promises";

type All = -1 | 0 | 1;
type Neighbor = readonly [All, All];

const neighbors: Neighbor[] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const lines = await readInputs("04inputs.txt");
console.log("Step 1:", step1(lines));
console.log("Step 2:", step2(lines));

function step1(lines: string[]) {
  const grid = lines.map((line) => line.split(""));
  let total = 0;
  for (let l = 0; l < grid.length; l++) {
    for (let c = 0; c < grid[l].length; c++) {
      if (
        grid[l][c] === "@" &&
        neighbors.filter(([dl, dc]) => grid[l + dl]?.[c + dc] === "@").length <
        4
      ) {
        total++;
      }
    }
  }
  return total;
}

function step2(lines: string[]) {
  const grid = lines.map((line) => line.split(""));
  let total = 0;
  let current = 0;
  do {
    total += current;
    current = 0;
    for (let l = 0; l < grid.length; l++) {
      for (let c = 0; c < grid[l].length; c++) {
        if (
          grid[l][c] === "@" &&
          neighbors.filter(([dl, dc]) => grid[l + dl]?.[c + dc] === "@")
            .length < 4
        ) {
          grid[l][c] = "x";
          current++;
        }
      }
    }
  } while (current !== 0);
  return total;
}

async function readInputs(fileName: string) {
  const contents = await readFile(fileName, "utf-8");
  return contents.split("\n");
}

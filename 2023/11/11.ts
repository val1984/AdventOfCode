import { day11Demo, day11Input } from "./11data.js";

function findGalaxies(universe: string[]) {
  const positions: [number, number][] = [];
  for (let y = 0; y < universe.length; y++) {
    for (let x = 0; x < universe.length; x++) {
      if (universe[y][x] === "#") {
        positions.push([x, y]);
      }
    }
  }
  return positions;
}

function findEmptyRows(universe: string[]) {
  const emptyRows: number[] = [];
  for (let y = 0; y < universe.length; y++) {
    let foundGalaxy = false;
    for (let x = 0; x < universe[y].length; x++) {
      foundGalaxy ||= universe[y][x] === "#";
    }
    if (!foundGalaxy) {
      emptyRows.push(y);
    }
  }
  return emptyRows;
}

function findEmptyCols(universe: string[]) {
  const emptyCols: number[] = [];
  for (let x = 0; x < universe[0].length; x++) {
    let foundGalaxy = false;
    for (let y = 0; y < universe.length; y++) {
      foundGalaxy ||= universe[y][x] === "#";
    }
    if (!foundGalaxy) {
      emptyCols.push(x);
    }
  }
  return emptyCols;
}

function computeDistanceBetweenGalaxiesAfterExpansion(
  input: string,
  expansionFactor: number
) {
  const universe = input.split("\n");
  const galaxiesPositions = findGalaxies(universe);
  const emptyRows = findEmptyRows(universe);
  const emptyCols = findEmptyCols(universe);
  const galaxiesDistance: number[] = [];
  for (let i = 0; i < galaxiesPositions.length; i++) {
    const [g1x, g1y] = galaxiesPositions[i];
    for (let j = i + 1; j < galaxiesPositions.length; j++) {
      const [g2x, g2y] = galaxiesPositions[j];
      let distance = 0;
      for (let x = Math.min(g1x, g2x); x < Math.max(g1x, g2x); x++) {
        if (emptyCols.includes(x)) {
          distance += expansionFactor;
        } else {
          distance++;
        }
      }
      for (let y = Math.min(g1y, g2y); y < Math.max(g1y, g2y); y++) {
        if (emptyRows.includes(y)) {
          distance += expansionFactor;
        } else {
          distance++;
        }
      }
      galaxiesDistance.push(distance);
    }
  }
  return galaxiesDistance.reduce((total, current) => total + current, 0);
}

function part1(input: string) {
  return computeDistanceBetweenGalaxiesAfterExpansion(input, 2);
}

console.log("Part 1", part1(day11Input));

function part2(input: string) {
  return computeDistanceBetweenGalaxiesAfterExpansion(input, 1_000_000);
}

console.log("Part 2", part2(day11Input));

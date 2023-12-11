import { day11Demo, day11Input } from "./11data.js";

function findGalaxies(universe: string[]) {
  const positions: Record<number, Record<number, boolean>> = {};
  for (let y = 0; y < universe.length; y++) {
    for (let x = 0; x < universe.length; x++) {
      if (universe[y][x] === "#") {
        positions[y] ??= {};
        positions[y][x] = true;
      }
    }
  }
  return positions;
}

function expandUniverse(universe: string[], factor:number =2) {
  const expansion = ".";
  const galaxies = findGalaxies(universe);
  const galaxiesColumns = Object.values(galaxies).reduce((acc, line) => {
    return { ...acc, ...line };
  }, {});
  const expandedUniverse = universe.flatMap((line, y) => {
    let expandedLine = "";
    for (let x = 0; x < line.length; x++) {
      expandedLine += line[x];
      if (!galaxiesColumns[x]) {
        expandedLine += expansion;
      }
    }
    return galaxies[y] ? [expandedLine] : [expandedLine, expandedLine];
  });
  return expandedUniverse;
}

function findGalaxiesPositions(universe: string[]) {
  const positions: [number, number][] = [];
  for (let y = 0; y < universe.length; y++) {
    for (let x = 0; x < universe[y].length; x++) {
      if (universe[y][x] === "#") {
        positions.push([x, y]);
      }
    }
  }
  return positions;
}

function part1(input: string) {
  const universe = input.split("\n");
  const expandedUniverse = expandUniverse(universe);
  const galaxiesPositions = findGalaxiesPositions(expandedUniverse);
  const galaxiesDistance: number[] = [];
  console.log(galaxiesPositions)
  let count = 0;
  for (let i = 0; i < galaxiesPositions.length; i++) {
    const [g1x, g1y] = galaxiesPositions[i];
    for (let j = i + 1; j < galaxiesPositions.length; j++) {
      const [g2x, g2y] = galaxiesPositions[j];
      const dx = Math.abs(g1x - g2x);
      const dy = Math.abs(g1y - g2y);
      console.log("Pair", ++count, "between", i, j, dx + dy);
      galaxiesDistance.push(dx + dy);
    }
  }
  return galaxiesDistance.reduce((total, current) => total + current, 0);
}

console.log("Part 1", part1(day11Input));

// function part2(input: string) {
//   return input.split("\n");
// }

// console.log("Part 2", part2(day11Demo));

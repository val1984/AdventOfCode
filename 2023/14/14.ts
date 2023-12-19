import { transpose } from "../../utils/matrix.ts";
import { day14Demo, day14Input } from "./14data.ts";

function tiltPlatform(cols: string[], down = false) {
  return cols.map((col) => {
    const groups = col.split("#");
    return groups
      .map((group) => {
        let newGroup = "";
        for (let i = 0; i < group.length; i++) {
          if (group[i] === ".") {
            if (down) {
              newGroup = "." + newGroup;
            } else {
              newGroup = newGroup + ".";
            }
          } else {
            if (down) {
              newGroup = newGroup + "O";
            } else {
              newGroup = "O" + newGroup;
            }
          }
        }
        return newGroup;
      })
      .join("#");
  });
}

function computeLoad(cols: string[]) {
  return cols.reduce((total, col) => {
    let local = 0;
    const size = col.length;
    for (let i = 0; i < size; i++) {
      if (col[i] === "O") {
        local += size - i;
      }
    }
    return total + local;
  }, 0);
}

function part1(input: string) {
  const rows = input.split("\n");
  const cols = tiltPlatform(transpose(rows));
  return computeLoad(cols);
}

console.log("Part 1", part1(day14Input));

function part2(input: string) {
  let grid = input.split("\n");
  const previousGrids = [];
  const iterations = 1000000000;
  for (let i = 0; i < iterations; i++) {
    previousGrids.push(grid.join("\n"));
    grid = tiltPlatform(transpose(grid)); // North
    grid = tiltPlatform(transpose(grid)); // West
    grid = tiltPlatform(transpose(grid), true); // South
    grid = tiltPlatform(transpose(grid), true); // East
    const cycleStart = previousGrids.indexOf(grid.join("\n"));
    if (cycleStart !== -1) {
      console.log("Grid", i, "is like grid", cycleStart);
      const remainingCyclesCount = iterations - cycleStart;
      const cycleLength = i - cycleStart + 1;
      return computeLoad(
        transpose(
          previousGrids[
            (remainingCyclesCount % cycleLength) + cycleStart
          ].split("\n")
        )
      );
      break;
    }
  }
  return computeLoad(grid);
}

console.log("Part 2", part2(day14Input));

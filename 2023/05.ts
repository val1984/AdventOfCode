import { day05Input } from "./05data";

function part1(input: string) {
  const data = input.split("\n\n");
  const seeds = data[0].replace("seeds: ", "").split(" ").map(Number);
  const maps = data.slice(1).map((map) =>
    map
      .split("\n")
      .slice(1)
      .map((line) => line.split(" ").map(Number))
  );
  return Math.min(
    ...seeds.map((seed) => {
      return maps.reduce((prev, map) => {
        for (const [dest, src, length] of map) {
          if (prev >= src && prev < src + length) {
            return prev - src + dest;
          }
        }
        return prev;
      }, seed);
    })
  );
}

console.log("Part 1", part1(day05Input));

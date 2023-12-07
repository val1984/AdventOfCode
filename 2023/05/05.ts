import { day05Demo, day05Input } from "./05data";

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

type Range = { start: number; length: number };
export function range(start: number, length: number): Range {
  return { start, length };
}

export function computeIntersection(
  range1: Range,
  range2: Range
): Range | undefined {
  if (
    range1.start + range1.length <= range2.start ||
    range2.start + range2.length <= range1.start ||
    range1.length <= 0 ||
    range2.length <= 0
  ) {
    return undefined;
  }
  return range(
    Math.max(range1.start, range2.start),
    Math.min(
      range1.length,
      range2.length,
      range1.start + range1.length - range2.start,
      range2.start + range2.length - range1.start
    )
  );
}

function part2(input: string) {
  const data = input.split("\n\n");
  const seeds = data[0].replace("seeds: ", "").split(" ").map(Number);

  const seedRanges: Range[] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push(range(seeds[i], seeds[i + 1]));
  }
  const maps = data.slice(1).map((map) =>
    map
      .split("\n")
      .slice(1)
      .map((line) => line.split(" ").map(Number))
      .sort((a, b) => a[1] - b[1])
  );

  let originalRanges = seedRanges;
  for (const map of maps) {
    let translatedRanges: Range[] = [];
    for (let originalRange of originalRanges) {
      const ranges = [originalRange];
      while (ranges.length > 0) {
        const current = ranges[0];
        if (!current || current.length <= 0) {
          // Current range has been exhausted
          ranges.splice(0, 1);
          break;
        }
        for (const [dest, src, length] of map) {
          if (!current || current.length <= 0) {
            break;
          }
          const translationDelta = dest - src;
          const commonRange = computeIntersection(range(src, length), current);
          if (commonRange === undefined) {
            continue;
          }

          if (current.start < commonRange.start) {
            current.length -= commonRange.length;
          } else if (
            current.start + current.length >
            commonRange.start + commonRange.length
          ) {
            current.start += commonRange.length;
            current.length -= commonRange.length;
          } else {
            current.length = 0;
          }
          commonRange.start += translationDelta;
          translatedRanges.push(commonRange);
        }
        ranges.splice(0, 1);
        translatedRanges.push(current);
      }
    }
    originalRanges = translatedRanges;
  }

  return Math.min(...originalRanges.map(({ start }) => start));
}

console.log("Part 2", part2(day05Input));

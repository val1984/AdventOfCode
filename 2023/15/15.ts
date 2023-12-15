import { day15Demo, day15Input } from "./15data";

function computeHASH(step: string) {
  let current = 0;

  for (let i = 0; i < step.length; i++) {
    current += step.charCodeAt(i);
    current *= 17;
    current %= 256;
  }
  return current;
}

function part1(input: string) {
  return input.split(",").reduce((total, step) => total + computeHASH(step), 0);
}

console.log("Part 1", part1(day15Input));

type Lens = [string, number];

function part2(input: string) {
  const steps = input.split(",");
  const lensBoxes: Lens[][] = [];
  steps.forEach((step) => {
    if (step.endsWith("-")) {
      const lensName = step.slice(0, -1);
      const position = computeHASH(lensName);
      lensBoxes[position] ??= [];
      lensBoxes[position] = lensBoxes[position].filter(
        ([lens]) => lens !== lensName
      );
    } else {
      const [lensName, focalLength] = step.split("=");
      const position = computeHASH(lensName);
      lensBoxes[position] ??= [];
      const existingLensPosition = lensBoxes[position].findIndex(
        ([lens]) => lens === lensName
      );
      if (existingLensPosition === -1) {
        lensBoxes[position].push([lensName, Number(focalLength)]);
      } else {
        lensBoxes[position][existingLensPosition][1] = Number(focalLength);
      }
    }
  });
  return lensBoxes.reduce((total, box, index) => {
    return (
      total +
      (index + 1) *
        box.reduce(
          (boxTotal, [, focalLength], position) =>
            boxTotal + (position + 1) * focalLength,
          0
        )
    );
  }, 0);
}

console.log("Part 2", part2(day15Input));

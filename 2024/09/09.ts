import { day09Demo, day09Inputs } from "./09data.ts";

function part1(inputs: string) {
  let pos = 0;
  const hardDrive: number[] = [];
  let totalBlocks = 0;
  for (let id = 0; id < inputs.length / 2; id++) {
    const blockLength = Number(inputs[2 * id]);
    const spaceLength = Number(inputs[2 * id + 1]);
    totalBlocks += blockLength;
    for (let j = 0; j < blockLength; j++) {
      hardDrive[pos++] = id;
    }
    if (!Number.isNaN(spaceLength)) {
      pos += spaceLength;
    }
  }
  let checksum = 0;
  for (let pos = 0; pos < totalBlocks; pos++) {
    let id = hardDrive.at(pos);
    while (id === undefined) {
      id = hardDrive.pop();
    }
    hardDrive[pos] = id;
    checksum += pos * id;
  }
  return checksum;
}

console.log("Part1:", part1(day09Inputs));


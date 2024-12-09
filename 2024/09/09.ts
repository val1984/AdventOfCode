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

console.log("Part 1:", part1(day09Inputs));

function part2(inputs: string) {
  let pos = 0;
  const hardDrive: number[] = [];
  let totalBlocks = 0;
  const blocks: number[] = [];
  const spaces: number[] = [];
  for (let id = 0; id < inputs.length / 2; id++) {
    const blockLength = Number(inputs[2 * id]);
    blocks.push(blockLength);
    const spaceLength = Number(inputs[2 * id + 1]);
    totalBlocks += blockLength;
    for (let j = 0; j < blockLength; j++) {
      hardDrive[pos++] = id;
    }
    if (!Number.isNaN(spaceLength)) {
      pos += spaceLength;
      spaces.push(spaceLength);
    }
  }
  let checksum = 0;
  const newBlocks = [...blocks];
  for (let index = blocks.length - 1; index > 0; index--) {
    let fittingPos = 0;
    let newPos = newBlocks[0];
    while (spaces[fittingPos] < blocks[index] && fittingPos < index) {
      newPos += spaces[fittingPos] + newBlocks[fittingPos + 1];
      fittingPos++;
    }
    if (spaces[fittingPos] >= blocks[index] && fittingPos < index) {
      const startIndex = hardDrive.findIndex(x => x === index);
      for (let i = 0; i < blocks[index]; i++) {
        delete hardDrive[startIndex + i];
        hardDrive[newPos + i] = index;
      }
      spaces[fittingPos] -= blocks[index];
      newBlocks[fittingPos] += blocks[index];
    }
  }
  for (let pos = 0; pos < hardDrive.length; pos++) {
    const id = hardDrive.at(pos);
    if (id) {
      checksum += pos * id;
    }
  }
  return checksum;
}

console.log("Part 2:", part2(day09Inputs));

import { day13Demo, day13Inputs } from "./13data.ts";

type Coords = readonly [x: number, y: number];

interface Machine {
  a: Coords;
  b: Coords;
  prize: Coords;
}

function parseTuple([x, y]: string[]) {
  return [Number(x), Number(y)] as const;
}

const buttonRegex = /Button [AB]: X\+(\d+), Y\+(\d+)/;
const prizeRegex = /Prize: X=(\d+), Y=(\d+)/;

function parse(inputs: string): Machine[] {
  const machines = inputs.split("\n\n");
  return machines.map((machine) => {
    const [btnA, btnB, prizeStr] = machine.split("\n");
    const [_a, ...a] = buttonRegex.exec(btnA) ?? [];
    const [_b, ...b] = buttonRegex.exec(btnB) ?? [];
    const [_prize, ...prize] = prizeRegex.exec(prizeStr) ?? [];
    return {
      a: parseTuple(a),
      b: parseTuple(b),
      prize: parseTuple(prize),
    };
  });
}

function solve({ a: [ax, ay], b: [bx, by], prize: [px, py] }: Machine) {
  // Not using an integer type is fun
  const b = Math.round((ay * px - ax * py) / (bx * ay - by * ax));
  const a = Math.round(px / ax - b * (bx / ax));
  // px = a * ax + b * bx
  // py = a * ay + b * by
  // ay * px - ax * py = b * (bx * ay - by * ax)
  // b = (ay * px - ax * py) / (bx * ay - by * ax);
  // a = (px / ax) - b * (bx / ax)
  const isSolutionValid = a * ax + b * bx === px && a * ay + b * by === py;
  return isSolutionValid ? a * 3 + b : 0;
}

function part1(inputs: string) {
  const machines = parse(inputs);
  return machines.reduce((total, machine) => {
    return total + solve(machine);
  }, 0);
}

console.log(part1(day13Inputs));

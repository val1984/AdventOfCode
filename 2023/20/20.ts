import { computeLcm, computePrimeFactors } from "../../utils/number.ts";
import { day20Demo1, day20Demo2, day20Input } from "./20data.ts";

type ModuleType = "broadcast" | "flip-flop" | "conjunction";
interface ModuleBase {
  id: string;
  type: ModuleType;
  destinations: string[];
}

interface FlipFlopModule extends ModuleBase {
  type: "flip-flop";
  isOn: boolean;
}

interface ConjunctionModule extends ModuleBase {
  type: "conjunction";
  previousInputsHighs: Record<string, boolean>;
}

interface BroadcasterModule extends ModuleBase {
  type: "broadcast";
}

type Module = BroadcasterModule | ConjunctionModule | FlipFlopModule;

function parseModule(line: string): [string, Module] {
  const [moduleText, destinationsText] = line.split(" -> ");
  const destinations = destinationsText.split(",").map((dest) => dest.trim());
  switch (true) {
    case moduleText === "broadcaster":
      return [moduleText, { id: moduleText, type: "broadcast", destinations }];
    case moduleText.startsWith("&"):
      const conId = moduleText.substring(1);
      return [
        conId,
        {
          id: conId,
          type: "conjunction",
          destinations,
          previousInputsHighs: {},
        },
      ];
    case moduleText.startsWith("%"):
      const id = moduleText.substring(1);
      return [id, { id, type: "flip-flop", destinations, isOn: false }];
    default:
      throw new Error("Unexpected input");
  }
}

function parseModulesGraph(input: string) {
  const modulesMap = Object.fromEntries(input.split("\n").map(parseModule));
  Object.values(modulesMap).forEach((module) => {
    module.destinations.forEach((dest) => {
      const destModule = modulesMap?.[dest];
      if (destModule?.type === "conjunction") {
        destModule.previousInputsHighs[module.id] = false;
      }
    });
  });
  return modulesMap;
}

function* range(end: number, start = 0) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

type Pulses = [low: number, high: number];

type ModuleVisitor = (
  module: Module,
  origin: string,
  pulseIsHigh: boolean
) => void;

function startPulse(
  modulesMap: Record<string, Module>,
  visitor: ModuleVisitor = () => {}
): Pulses {
  const modulesQueue: [string, string, boolean][] = [
    ["button", "broadcaster", false],
  ];
  let low = 0;
  let high = 0;
  while (modulesQueue.length !== 0) {
    const [origin, destination, pulseIsHigh] = modulesQueue.pop()!;
    if (pulseIsHigh) {
      high++;
    } else {
      low++;
    }
    const module = modulesMap[destination];
    if (module === undefined) {
      continue;
    }

    switch (module.type) {
      case "broadcast":
        module.destinations.forEach((nextId) => {
          modulesQueue.unshift([module.id, nextId, pulseIsHigh]);
        });
        break;
      case "flip-flop":
        if (pulseIsHigh) {
          continue;
        }
        module.isOn = !module.isOn;
        module.destinations.forEach((nextId) => {
          modulesQueue.unshift([module.id, nextId, module.isOn]);
        });
        break;
      case "conjunction":
        module.previousInputsHighs[origin] = pulseIsHigh;
        const nextPulseIsHigh = !Object.values(
          module.previousInputsHighs
        ).every(Boolean);
        module.destinations.forEach((nextId) => {
          modulesQueue.unshift([module.id, nextId, nextPulseIsHigh]);
        });
        break;
    }
    visitor(module, origin, pulseIsHigh);
  }
  return [low, high];
}

function part1(input: string) {
  const modulesGraph = parseModulesGraph(input);
  let low = 0,
    high = 0;
  for (const i of range(1000)) {
    const [currLow, currHigh] = startPulse(modulesGraph);
    low += currLow;
    high += currHigh;
  }
  console.log({ low, high });
  return low * high;
}

console.log("Part 1", part1(day20Input));

function findRx(modulesGraph: { [k: string]: Module }) {
  for (const id of Object.keys(modulesGraph)) {
    if (modulesGraph[id].destinations.includes("rx")) {
      return modulesGraph[id];
    }
  }
}

function part2(input: string) {
  const modulesGraph = parseModulesGraph(input);
  const rxOrigin = findRx(modulesGraph);
  if (rxOrigin?.type !== "conjunction") {
    throw new Error("Unexpected rx origin module");
  }
  const cycleModules = Object.keys(rxOrigin.previousInputsHighs);
  const cycleLengths = Object.fromEntries(cycleModules.map((id) => [id, 0]));
  let buttonPresses = 0;
  const visitor: ModuleVisitor = ({ type, id }, origin, pulseIsHigh) => {
    if (type === "conjunction" && id === rxOrigin.id && pulseIsHigh) {
      cycleLengths[origin] = buttonPresses;
    }
  };
  while (cycleModules.some((id) => cycleLengths[id] === 0)) {
    buttonPresses++;
    startPulse(modulesGraph, visitor);
  }
  console.log(cycleLengths);
  return computeLcm(Object.values(cycleLengths));
}

console.log("Part 2", part2(day20Input));

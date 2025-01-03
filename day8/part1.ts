import {
  Antenna,
  calcAntinodes,
  calcPairs,
  isWithin,
  Point,
} from "./functions.ts";
import { groupBy, uniqWith } from "@es-toolkit/es-toolkit";

const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n").filter(Boolean);

const height = lines.length;
const width = lines[0].length;
const within = isWithin(width, height);

const antennas: Antenna[] = [];
for (const [y, line] of lines.entries()) {
  for (const [x, char] of line.split("").entries()) {
    const freq = /\w/.test(char) ? char : undefined;
    if (freq) antennas.push({ x, y, freq });
  }
}

const anntenasByFreq = Object.entries(groupBy(antennas, (a) => a.freq));

const antinodes = anntenasByFreq.reduce((acc, [freq, antennas]) => {
  const pairs = calcPairs(antennas);
  const antinodes = pairs
    .flatMap(([p1, p2]) => calcAntinodes(p1, p2))
    .filter(within);
  acc.set(freq, antinodes);
  return acc;
}, new Map<string, Point[]>());

console.log(antinodes);
console.log(
  uniqWith(
    Array.from(antinodes.values()).flat(),
    (a, b) => a.x === b.x && a.y === b.y,
  ).length,
);

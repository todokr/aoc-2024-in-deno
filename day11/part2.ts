import { split, type Stone } from "./function.ts";

const Blink = 75;

const countStone = (
  stone: Stone,
  start: number,
  cache: Map<string, number>,
): number => {
  const key = JSON.stringify({...stone, start});
  if (cache.has(key)) return cache.get(key)!;

  let count = 1;
  let round = start;
  let currentStones = [stone];

  while (round < Blink) {
    const calcTargets = [];
    const carryOver = [];
    for (const current of currentStones) {
      if (current.no === 0) {
        carryOver.push({no: 1});
      } else if (`${current.no}`.length % 2 === 0) {
        const [left, right] = split(current.no);
        carryOver.push({no: left});
        calcTargets.push({no: right});
      } else {
        carryOver.push({no: current.no * 2024});
      }
    }
    for (const t of calcTargets) {
      count += countStone(t, round + 1, cache);
    }
    currentStones = carryOver;
    round++;
  }
  cache.set(key, count);
  return count;
};

const stones = Deno.readTextFileSync("input.txt")
  .trim().split(" ")
  .map((i) => ({no: parseInt(i, 10)}));
const cache = new Map<string, number>();

const result = stones.reduce((acc, stone) => {
  return acc + countStone(stone, 0, cache);
}, 0);

console.log(result);

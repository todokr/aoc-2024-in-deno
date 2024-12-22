import { load, Machine } from "./function.ts";

type Answer = {aCount: number, bCount: number, tokens: number};

const ToAdd = 10000000000000;
const correct = (machine: Machine) => {
  const prize = {y: machine.prize.y + ToAdd, x: machine.prize.x + ToAdd};
  return {...machine, prize };
}

const input = Deno.readTextFileSync("input.txt");
const machines = load(input).map(correct);

const solveWithCramersRule = (machine: Machine): Answer | undefined => {
  const {a, b, prize} = machine;
  const d = a.x * b.y - a.y * b.x;
  const dx = prize.x * b.y - prize.y * b.x;
  const dy = a.x * prize.y - a.y * prize.x;
  if (d === 0) return undefined;
  const aCount = dx / d;
  const bCount = dy / d;
  if (aCount % 1 !== 0 || bCount % 1 !== 0) return undefined;
  const tokens = (aCount * 3) + bCount;
  return {aCount, bCount, tokens};
}

let totalTokens = 0;
for (const machine of machines) {
  const answer = solveWithCramersRule(machine);
  if (answer !== undefined) {
    totalTokens += answer.tokens;
  }
}

console.log(totalTokens);



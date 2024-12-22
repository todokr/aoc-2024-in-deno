import { load, Machine } from "./function.ts";

const input = Deno.readTextFileSync("input.txt");
const machines = load(input);

type Answer = {aCount: number, bCount: number, tokens: number};
const solve = (machine: Machine): Answer | undefined => {
  let answer: Answer | undefined = undefined;
  const {a, b, prize} = machine;
  for (let aCount = 0; aCount <= 100; aCount++) {
    for (let bCount = 0; bCount <= 100; bCount++) {
      const x = (a.x * aCount) + (b.x * bCount);
      const y = (a.y * aCount) + (b.y * bCount);
      if (x === prize.x && y === prize.y) {
        const tokens = (aCount * 3) + bCount;
        if (!answer || tokens < answer.tokens) {
          answer = {aCount, bCount, tokens};
        }
      }
    }
  }
  return answer;
};

let totalTokens = 0;
for (const machine of machines) {
  const answer = solve(machine);
  if (answer !== undefined) {
    totalTokens += answer.tokens;
  }
}

console.log(totalTokens);

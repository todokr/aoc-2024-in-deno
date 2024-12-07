import { comparator, isEqual, parseInput, takeMiddle } from "./misc.ts";

const input = Deno.readTextFileSync("input.txt");
const { rules, updates } = parseInput(input);
const compareFn = comparator(rules);

const correct = updates.filter((update) => {
  const orderedByRule = update.toSorted(compareFn);
  return isEqual(update, orderedByRule);
});

const result = correct.reduce((acc, update) => {
  return acc + takeMiddle(update);
}, 0);

console.log(result);

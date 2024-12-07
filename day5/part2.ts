import { comparator, isEqual, parseInput, takeMiddle } from "./misc.ts";

const input = Deno.readTextFileSync("input.txt");
const { rules, updates } = parseInput(input);
const compareFn = comparator(rules);

const checked = updates.map((update) => {
  const orderedByRule = update.toSorted(compareFn);
  const correct = isEqual(update, orderedByRule);
  return { correct, update: orderedByRule };
});

const reordered = checked
  .filter(({ correct }) => !correct)
  .map((check) => check.update);

const result = reordered.reduce((acc, update) => {
  return acc + takeMiddle(update);
}, 0);

console.log(result);

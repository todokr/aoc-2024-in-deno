import { aroundCell, Cell, load } from "./function.ts";

const input = Deno.readTextFileSync("input.txt");
const { map, trailHeads } = load(input);

const arounder = aroundCell(map);
const _loop = (current: Cell, round: number): Cell[] => {
  const around = arounder(current);
  const thisTime = around.filter(({ z }) => z === round);

  if (round < 9) {
    return thisTime.flatMap((cell) => _loop(cell, round + 1));
  } else {
    return thisTime;
  }
};
const count = trailHeads
  .map((head) => _loop(head, 1))
  .reduce((acc, ends) => acc + ends.length, 0);

console.log(count);

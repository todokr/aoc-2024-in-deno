import { applyBlink } from "./function.ts";

const Blinks = 25;

const input = Deno.readTextFileSync("input.txt")
  .trim().split(" ")
  .map((i) => ({ no: parseInt(i, 10) }));

let count = 0;
let acc = input;
while (count < Blinks) {
  console.log(`${count} ----------------${acc.length}`);
  acc = acc.flatMap(applyBlink);
  count++;
}
// console.log(acc.map((stone) => stone.no).join(" "));

const result = acc.length;
console.log(result);

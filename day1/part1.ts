import { input } from "./input.ts";
const { left, right } = input("input.txt");
left.sort();
right.sort();

const zipped = left.map((_, i) => [left[i], right[i]]);
const totalDiff = zipped.reduce((acc, [l, r]) => acc + Math.abs(l - r), 0);

console.log(totalDiff);

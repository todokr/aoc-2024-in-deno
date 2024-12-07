import { input } from './input.ts';

const { left, right } = input("input.txt");

const counts = new Map<number, number>();
for (const r of right) {
  const count = counts.get(r);
  counts.set(r, count ? count + 1 : 1);
}

const similarity = left.reduce((acc, l) => {
  const rCount = counts.get(l) || 0;
  return acc + l * rCount;
}, 0);

console.log(similarity);

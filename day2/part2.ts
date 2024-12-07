import { isSafeWithDampener } from "./is-safe.ts";

const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);
const table = lines.map((line) => line.split(/\s+/).map((i) => +i));
const safe = table.filter(isSafeWithDampener);

console.log(safe.length);

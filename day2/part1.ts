import { isSafe } from "./is-safe.ts";

const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n").filter(Boolean);
const table = lines.map((line) => line.split(/\s+/).map((i) => +i));
const safe = table.filter((xs) => isSafe(xs));

console.log(safe.length);

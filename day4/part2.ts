import { count } from "./x.ts";
const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n").filter(Boolean);
const table = lines.map((line) => line.split(""));

console.log(count(table));

import { count, extract } from "./extractor.ts";

const Pattern = /XMAS/g;

const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n").filter(Boolean);
const table = lines.map((line) => line.split(""));
const candidates = extract(table);

console.log(count(candidates, Pattern));

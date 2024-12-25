import { load, dijkstra } from "./function.ts";

const input = Deno.readTextFileSync("input.txt");
const {map, start} = load(input);
console.log(dijkstra(map, start));

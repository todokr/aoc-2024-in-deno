import { evaluate, type Op, parse } from "./parser.ts";

const input = Deno.readTextFileSync("input.txt");
const ops = parse(input);

const result = ops.reduce((acc, op) => {
  return acc + evaluate(op);
}, 0);

console.log(result);

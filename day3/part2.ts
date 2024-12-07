import { evaluate, parse } from "./parser.ts";

const input = Deno.readTextFileSync("input.txt");
const ops = parse(input);
const result = ops.reduce(({ acc, ignoring }, op) => {
  switch (op.code) {
    case "do":
      return { acc, ignoring: false };
    case "dont":
      return { acc, ignoring: true };
    case "mul":
      if (ignoring) {
        return { acc, ignoring };
      } else {
        return { acc: acc + evaluate(op), ignoring };
      }
  }
}, { acc: 0, ignoring: false }).acc;

console.log(result);

import { asArray, checksum, decode, defrag } from "./function.ts";

const input = Deno.readTextFileSync("input.txt").trim();
const contents = asArray(decode(input));

const defraged = defrag(contents);
console.log(checksum(defraged));

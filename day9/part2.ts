import {
  asArray,
  decode,
  findSpace,
  isFile,
  place,
  checksum
} from "./function.ts";

const input = Deno.readTextFileSync("test.txt").trim();
const contents = decode(input);
const files = contents.filter(isFile).reverse();

const result = [...contents];
for (const [i, file] of files.entries()) {
  const s = findSpace(result, file.size);
  if (s.found && s.index < file.index) {
    const moving = place(s.space, file);
    result.splice(s.index, 1, ...moving);
    const old = result.findLastIndex((c) => isFile(c) && c.id === file.id);
    result.splice(old, 1, { size: file.size });
  }
}

console.log('end');
console.log(checksum(asArray(result)));

import { countSides, grouping, IdGenerator, load } from "./function.ts";

const input = Deno.readTextFileSync("input.txt");

const map = load(input);
const groups = grouping(map, new IdGenerator());

let total = 0;
for (const [id, members] of Object.entries(groups)) {
  const region = members.length;
  const sides = countSides(members);
  console.log({ id, region, sides });
  total = total + (region * sides);

  const debug = () => {
    for (const member of members.toSorted((a, b) => a.y - b.y)) {
      console.log("  ", member.plantKind, {
        x: member.x,
        y: member.y,
        top: member.top,
        right: member.right,
        bottom: member.bottom,
        left: member.left,
      });
    }
  };
  // debug();
}

console.log(total);

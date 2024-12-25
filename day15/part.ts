import { Player, load } from "./function.ts";

const input = Deno.readTextFileSync("input.txt");
const { map, actions } = load(input);

for (const action of actions) {
  map.eval(action);
}
// const player = new Player(map);
// player.start();

let coord = 0;
for(const box of map.boxes) {
  coord = coord + (100 * box.y) + box.x;
}

console.log(coord);


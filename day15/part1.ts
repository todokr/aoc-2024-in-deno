import { load } from "./function.ts"

const input = Deno.readTextFileSync("input.txt");

const { map, actions } = load(input);
for (const action of actions) {
    map.eval(action);
}
map.print();

let coordinateSum = 0;
for (const {x, y} of map.boxes) {
    coordinateSum += 100 * y + x;
}
console.log(coordinateSum);

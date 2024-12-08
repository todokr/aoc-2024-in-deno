import { Cell, FieldMap, Guard, Player, Scene } from "./scene.ts";

const loadInput = (): { map: FieldMap; guard: Guard } => {
  const map: Cell[][] = [];
  const guard: Guard = { x: 0, y: 0, direction: "up" };
  const input = Deno.readTextFileSync("input.txt");
  const lines = input.split("\n").filter(Boolean);
  for (let y = 0; y < lines.length; y++) {
    map.push([]);
    const row = lines[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "^") {
        guard.x = x;
        guard.y = y;
      }
      const char = row[x];
      const obstraction = char === "#";
      const cell = { x, y, obstraction };
      map[y].push(cell);
    }
  }
  return { map, guard };
};

const { map, guard } = loadInput();

const infinitLoop = [];
const movable = map.flat().filter((cell) => !cell.obstraction);
for(const {x, y} of movable) {
  const scene = new Scene(map, guard);
  scene.setObstraction(x, y);
  console.log("obstraction", x, y, "==============================");
  const player = new Player(scene);
  const endState = await player.play();
  if (endState === "abyss") {
    infinitLoop.push({x, y});
  }
}

console.log(infinitLoop.length);

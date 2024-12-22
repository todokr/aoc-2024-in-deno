import { load, Player, Scene, toQuadrant } from "./function.ts";

const MaxX = 101;
const MaxY = 103;

const input = Deno.readTextFileSync("input.txt");
const robots = load(input);

const scene = new Scene(robots, { x: MaxX, y: MaxY });
const player = new Player(scene);

player.play(100);

const countRobot = (grid: string[][]) =>
  grid.flat().map(Number).reduce((acc, i) => acc + i, 0);
let factor = 0;
const [a1, a2, a3, a4] = toQuadrant(player.scene.current("count"));

console.log(countRobot(a1) * countRobot(a2) * countRobot(a3) * countRobot(a4));

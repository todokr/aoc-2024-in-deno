import { Player } from "./scene.ts";
import { setup } from "./scene_test.ts";

const obstractions = [
  { x: 1, y: 1 },
  { x: 7, y: 2 },
  { x: 6, y: 7 },
  { x: 3, y: 6 },
  { x: 4, y: 0 },
  { x: 8, y: 1 },
  { x: 7, y: 9 },
  { x: 2, y: 0 },
];
const width = 10;
const height = 10;
const scene = setup(width, height, obstractions, { x: 1, y: 3 });
const player = new Player(scene, 4);
await player.play();

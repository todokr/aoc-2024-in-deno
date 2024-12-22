import { load, Player, Scene } from "./function.ts";

const MaxX = 101;
const MaxY = 103;

const Threshold = 10;

const input = Deno.readTextFileSync("input.txt");
const robots = load(input);

const continuous = (row: number[]): number => {
  let max = 0;
  let count = 0;
  for (let i = 0; i < row.length; i++) {
    if (row[i] !== 0) {
      count++;
    } else {
      if (count > max) {
        max = count;
      }
      count = 0;
    }
  }
  return max;
}

const check = (s: Scene): boolean => {
  return s.current("count").some((row) => continuous(row as number[]) >= Threshold);
}

const scene = new Scene(robots, { x: MaxX, y: MaxY });
const player = new Player(scene);

player.playWithCheck(100000, check);

export class Robot {
  point: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };

  constructor(
    arg: {
      point: { x: number; y: number };
      velocity: { x: number; y: number };
    },
  ) {
    this.point = arg.point;
    this.velocity = arg.velocity;
  }

  move(maxX: number, maxY: number) {
    const newX = withTeleport(maxX, this.point.x + this.velocity.x);
    const newY = withTeleport(maxY, this.point.y + this.velocity.y);
    this.point = { x: newX, y: newY };
  }
}

const Pattern = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/;

export const load = (input: string): Robot[] => {
  return input.split("\n").filter(Boolean).map((line) => {
    const match = line.match(Pattern);
    if (!match) {
      throw new Error(`Invalid input: ${line}`);
    }
    const [, px, py, vx, vy] = match;
    return new Robot({
      point: { x: parseInt(px, 10), y: parseInt(py, 10) },
      velocity: { x: parseInt(vx, 10), y: parseInt(vy, 10) },
    });
  });
};

const withTeleport = (max: number, n: number) => {
  const x = n % max;
  return x >= 0 ? x : x + max;
};

export class Scene {
  robots: Robot[];
  maxX: number;
  maxY: number;

  constructor(robots: Robot[], tiles: { x: number; y: number }) {
    this.robots = robots;
    this.maxX = tiles.x;
    this.maxY = tiles.y;
  }

  next() {
    for (const robot of this.robots) {
      robot.move(this.maxX, this.maxY);
    }
  }

  print(mode: "count" | "emoji") {
    return this.current(mode).map((line) => line.join("")).join("\n");
  }

  current(mode: "count" | "emoji"): (string | number)[][] {
    if (mode === "emoji") {
      const grid: Grid<typeof mode> = new Array(this.maxY).fill(0).map(() =>
        new Array(this.maxX).fill("⬜")
      );
      for (const { point } of this.robots) {
        grid[point.y][point.x] = "🤖";
      }
      return grid;
    } else {
      const grid: Grid<typeof mode> = new Array(this.maxY).fill(0).map(() =>
        new Array(this.maxX).fill(0)
      );
      for (const { point } of this.robots) {
        grid[point.y][point.x] += 1;
      }
      return grid;
    }
  }
}

type Grid<T extends string> = T extends "emoji" ? string[][] : number[][];

export class Player {
  time: number;

  constructor(protected scene: Scene) {
    this.time = 0;
  }

  play(max: number) {
    while(this.time < max) {
      this.scene.next();
      this.time += 1;
    }
  }

  playWithCheck(max: number, checker: (_:Scene) => boolean) {
    while(this.time < max) {
      if (this.time % 1000 === 0) console.log(`After ${this.time} s`);
      this.scene.next();
      this.time += 1;
      if (checker(this.scene)) {
        console.log(`After ${this.time} s`);
        console.log(this.scene.print("emoji"));
        break;
      }
    }
  }
}

export const toQuadrant = (
  grid: string[][],
): [string[][], string[][], string[][], string[][]] => {
  const [x, y] = [grid[0].length, grid.length];
  const [x2, y2] = [Math.floor(x / 2), Math.floor(y / 2)];
  return [
    grid.slice(0, y2).map((line) => line.slice(0, x2)),
    grid.slice(0, y2).map((line) => line.slice(x2 + 1)),
    grid.slice(y2 + 1).map((line) => line.slice(0, x2)),
    grid.slice(y2 + 1).map((line) => line.slice(x2 + 1)),
  ];
};

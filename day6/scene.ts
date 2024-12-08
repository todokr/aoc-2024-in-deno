export class Player {
  private frame: number = 0;
  constructor(
    private scene: Scene,
    private fps?: number,
  ) {}

  async play(): Promise<SceneState> {
    if (this.fps) {
      console.log("\x1b[H\x1b[2J");
      console.log(`state: ${this.scene.state}`);
      console.log(`visited: ${this.scene.visited.length}`);
      this.scene.draw();
      await this.delay(1000 / this.fps);
    }
    this.frame++;
    if (this.scene.state === "ongoing") {
      this.scene.next();
      return await this.play();
    } else {
      console.log(`state: ${this.scene.state}`);
      console.log(`visited: ${this.scene.visited.length}`);
      return Promise.resolve(this.scene.state);
    }
  }

  private async delay(n: number): Promise<void> {
    return new Promise((resolve: () => void, _) => {
      setTimeout(resolve, n);
    });
  }
}

export class Scene {
  state: SceneState = "ongoing";
  private map: Readonly<FieldMap>;
  guard: Readonly<Guard>;
  constructor(private _map: FieldMap, private _guard: Guard) {
    this.map = structuredClone(_map);
    this.map[_guard.y][_guard.x].visited = _guard.direction;
    this.guard = _guard;
  }
  get visited(): Cell[] {
    return this.map.flat().filter((cell) => cell.visited);
  }

  setObstraction(x: number, y: number) {
    this.map[y][x].obstraction = true;
  }
  get obstractions() {
    return this.map.flat().filter(cell => cell.obstraction);
  }

  draw() {
    for (const row of this.map) {
      const pxcel = row.map((cell) => {
        return this.cellView(cell, this.guard);
      });
      console.log(pxcel.join(""));
    }
  }

  next() {
    const front = this.front;
    if (!front) {
      this.state = "finished";
      return;
    }
    if (front.obstraction) {
      this.turn();
    } else {
      this.move(front);
      // visit for the first time
      if (!front.visited) {
        front.visited = this.guard.direction;
      } // second time, same direction means the abyss of time
      else if (front.visited === this.guard.direction) {
        this.state = "abyss";
      }
    }
  }

  move(cell: Cell) {
    this.guard = { ...this.guard, x: cell.x, y: cell.y };
  }

  turn() {
    this.guard = { ...this.guard, direction: this.nextDirection };
  }

  private get front(): Cell {
    const { x, y, direction } = this.guard;
    switch (direction) {
      case "up":
        return this.map[y - 1]?.[x];
      case "down":
        return this.map[y + 1]?.[x];
      case "left":
        return this.map[y][x - 1];
      case "right":
        return this.map[y][x + 1];
    }
  }

  private get nextDirection() {
    const { direction } = this.guard;
    switch (direction) {
      case "up":
        return "right";
      case "down":
        return "left";
      case "left":
        return "up";
      case "right":
        return "down";
    }
  }

  private cellView(cell: Cell, guard: Guard): string {
    if (cell.x === guard.x && cell.y === guard.y) {
      switch (guard.direction) {
        case "up":
          return "⬆️";
        case "down":
          return "⬇️";
        case "left":
          return "⬅️";
        case "right":
          return "➡️";
      }
    }
    if (cell.visited) {
      return "⬛";
    }
    if (cell.obstraction) {
      return "🚫";
    }
    return "⬜";
  }
}

type SceneState = "ongoing" | "finished" | "abyss";

export type Cell = {
  x: number;
  y: number;
  visited?: Direction;
  obstraction: boolean;
};
export type FieldMap = Cell[][];

type Direction = "up" | "down" | "left" | "right";

export type Guard = {
  x: number;
  y: number;
  direction: Direction;
};

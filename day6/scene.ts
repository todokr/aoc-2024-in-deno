export class Player {
  private frame: number = 0;
  constructor(
    private scene: Scene,
    private fps: number,
    private draw: boolean = true,
  ) {}

  async play() {
    console.log("\x1b[H\x1b[2J");
    if (this.draw) {
      console.log(`state: ${this.scene.state}`);
      console.log(`visited: ${this.scene.visited.length}`);
      this.scene.draw();
      await this.delay(1000 / this.fps);
    }
    this.frame++;
    if (this.scene.state === "ongoing") {
      this.scene.next();
      await this.play();
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
  constructor(private _map: FieldMap, private _guard: Guard) {
    _map[_guard.y][_guard.x].visited = _guard.direction;
  }

  get guard(): Readonly<Guard> {
    return this._guard;
  }

  get visited(): Cell[] {
    return this._map.flat().filter((cell) => cell.visited);
  }

  draw() {
    for (const row of this._map) {
      const pxcel = row.map((cell) => {
        return this.cellView(cell, this._guard);
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
        front.visited = this._guard.direction;
      } // second time, same direction means the abyss of time
      else if (front.visited === this._guard.direction) {
        this.state = "abyss";
      }
    }
  }

  move(cell: Cell) {
    this._guard = { ...this._guard, x: cell.x, y: cell.y };
  }

  turn() {
    this._guard = { ...this._guard, direction: this.nextDirection };
  }

  private get front(): Cell {
    const { x, y, direction } = this._guard;
    switch (direction) {
      case "up":
        return this._map[y - 1]?.[x];
      case "down":
        return this._map[y + 1]?.[x];
      case "left":
        return this._map[y][x - 1];
      case "right":
        return this._map[y][x + 1];
    }
  }

  private get nextDirection() {
    const { direction } = this._guard;
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

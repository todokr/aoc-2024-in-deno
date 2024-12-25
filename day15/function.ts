export type Point = {
  x: number;
  y: number;
  obj: Obj;
};
type Obj = "#" | "." | "@" | "[" | "]";
type Direction = "<" | ">" | "^" | "v";

export const load = (input: string): { map: Map; actions: Direction[] } => {
  const [mapArea, actionsArea] = input.split("\n\n");
  const points: Point[][] = [];
  const lines = mapArea.split("\n").filter(Boolean);
  for (let y = 0; y < lines.length; y++) {
    points[y] = [];
    for (let x = 0; x < lines[y].length; x++) {
      const obj = lines[y][x];
      let objs = [];
      switch (obj) {
        case "@": {
          objs = ["@", "."];
          break;
        }
        case "O": {
          objs = ["[", "]"];
          break;
        }
        default: {
          objs = [obj, obj];
        }
      }
      const [obj1, obj2] = objs;
      points[y].push({ x: x * 2, y, obj: obj1 as Obj });
      points[y].push({ x: x * 2 + 1, y, obj: obj2 as Obj });
    }
  }
  const map = new Map(points);
  const actions = actionsArea.split("").filter(Boolean) as Direction[];
  return { map, actions };
};

export const loadExpanded = (
  input: string,
): { map: Map; actions: Direction[] } => {
  const [mapArea, actionsArea] = input.split("\n\n");
  const points: Point[][] = [];
  const lines = mapArea.split("\n").filter(Boolean);
  for (let y = 0; y < lines.length; y++) {
    points[y] = [];
    for (let x = 0; x < lines[y].length; x++) {
      points[y][x] = { x, y, obj: lines[y][x] as Obj };
    }
  }
  const map = new Map(points);
  const actions = actionsArea.split("").filter(Boolean) as Direction[];
  return { map, actions };
};

export class Map {
  constructor(public map: Point[][]) {}

  get robot() {
    return this.map.flat().find(({ obj }) => obj === "@")!;
  }

  get boxes() {
    return this.map.flat().filter(({ obj }) => obj === "[");
  }

  eval(d: Direction) {
    const robot = this.robot;
    const { x, y } = robot;
    let nx = x;
    let ny = y;
    switch (d) {
      case "<":
        nx = x - 1;
        break;
      case ">":
        nx = x + 1;
        break;
      case "^":
        ny = y - 1;
        break;
      case "v":
        ny = y + 1;
        break;
    }
    const nextObj = this.map[ny][nx].obj;
    if (nextObj === ".") {
      // just move
      this.map[y][x].obj = ".";
      this.map[ny][nx].obj = "@";
    } else if (nextObj === "[" || nextObj === "]") {
      const ahead = this.ahead(this.robot, d);
      if (d === "<" || d === ">") {
        // push horizontally
        if (this.canMove(ahead)) {
          this.slide(d, ahead);
        }
      } else {
        // push vertically
        const touch = ahead[0];
        const moving = this.verticalMovingBlocks(touch, d);
        const aheadPoints: Set<Point> = new Set();
        for (const box of moving) {
          const aheads = [box.left, box.right].flatMap((p) => this.ahead(p, d));
          for (const p of aheads) {
            aheadPoints.add(p);
          }
        }

        const byX = Object.values(
          Object.groupBy(aheadPoints, (p) => p.x),
        ) as Point[][];

        const order: (a: Point, b: Point) => number = d === "^"
          ? (a, b) => b.y - a.y
          : (a, b) => a.y - b.y;

        for (const g of byX) {
          g.sort(order);
        }

        if (byX.every(this.canMove)) {
          for (const g of byX) {
            this.slide(d, g);
          }
          this.map[y][x].obj = ".";
          this.map[ny][nx].obj = "@";
        }
      }
    }
  }

  print() {
    for (let i = 0; i < this.map.length; i++) {
      let line = "";
      for (let j = 0; j < this.map[i].length; j++) {
        line += this.map[i][j].obj;
      }
      console.log(line);
    }
  }

  private canMove(ahead: Point[]): boolean {
    return ahead[ahead.length - 1]?.obj === ".";
  }

  private ahead(from: Point, d: Direction): Point[] {
    const points: Point[] = [];
    let next = this.next(from, d);
    while (next) {
      points.push(next);
      if (next.obj === "#" || next.obj === ".") break;
      next = this.next(next, d);
    }
    return points;
  }

  private slide(d: Direction, ahead: Point[]): void {
    for (const p of ahead.toReversed()) {
      const prev = this.prev(p, d)!;
      this.map[p.y][p.x].obj = prev.obj === "#"
        ? "."
        : this.map[prev.y][prev.x].obj;
    }
    const f = this.prev(ahead[0], d)!.obj;
    if (f !== "#") {
      this.prev(ahead[0], d)!.obj = ".";
    }
  }

  private prev(from: Point, d: Direction): Point | undefined {
    const { x, y } = from;
    let px = x;
    let py = y;
    switch (d) {
      case "<":
        px = x + 1;
        break;
      case ">":
        px = x - 1;
        break;
      case "^":
        py = y + 1;
        break;
      case "v":
        py = y - 1;
        break;
    }
    return this.map[py][px];
  }

  private next(from: Point, d: Direction): Point | undefined {
    const { x, y } = from;
    let nx = x;
    let ny = y;
    switch (d) {
      case "<":
        nx = x - 1;
        break;
      case ">":
        nx = x + 1;
        break;
      case "^":
        ny = y - 1;
        break;
      case "v":
        ny = y + 1;
        break;
    }
    return this.map[ny][nx];
  }

  verticalMovingBlocks(touch: Point, d: Direction): Block[] {
    const { x, y, obj: pushing } = touch;
    if (pushing !== "[" && pushing !== "]") return [];
    const pushingBox = pushing === "["
      ? { left: touch, right: this.map[y][x + 1] }
      : { left: this.map[y][x - 1], right: touch };
    const { left, right } = pushingBox;

    const nextTouches: Point[] = [];
    const nextLeft = this.next(left, d);
    if (nextLeft) nextTouches.push(nextLeft);
    const nextRight = this.next(right, d);
    if (nextRight && nextRight.obj !== right.obj) { // if the same, the blocks are aligned straight
      nextTouches.push(nextRight);
    }
    return [
      pushingBox,
      ...nextTouches.flatMap((t) => this.verticalMovingBlocks(t, d)),
    ];
  }
}

type Block = {
  left: Point;
  right: Point;
};

export class Player {
  constructor(public map: Map) {}

  async start() {
    while (true) {
//      console.clear();
      this.map.print();
      const buf = new Uint8Array(8);
      const inp = await Deno.stdin.read(buf);
      // to string char
      const str = new TextDecoder().decode(buf.filter((b) => b !== 0)).trim();
      if (inp === null || str === "quit") break;
      const d = this.convert(str);
      if (d) this.map.eval(d);
    }
  }

  convert(input: string): Direction | undefined {
    switch (input) {
      case "w":
        return "^";
      case "s":
        return "v";
      case "a":
        return "<";
      case "d":
        return ">";
    }
  }
}

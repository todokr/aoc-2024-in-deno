export type Point = {
  x: number;
  y: number;
  obj: Obj;
}
type Obj = "#" | "." | "@" | "O"| "[" | "]";
type Direction = "<" | ">" | "^" | "v";

export const load = (input: string): {map: Map, actions: Direction[]} => {
  const [mapArea, actionsArea] = input.split("\n\n");
  const points: Point[][] = [];
  const lines = mapArea.split("\n").filter(Boolean);
  for(let y = 0; y < lines.length; y++) {
    points[y] = [];
    for(let x = 0; x < lines[y].length; x++) {
      points[y][x] = {x, y, obj: lines[y][x] as Obj};
    }
  }
  const map = new Map(points);
  const actions = actionsArea.split("").filter(Boolean) as Direction[];
  return {map, actions};
}

export const loadExpanded = (input: string): {map: Map, actions: Direction[]} => {
  const [mapArea, actionsArea] = input.split("\n\n");
  const points: Point[][] = [];
  const lines = mapArea.split("\n").filter(Boolean);
  for(let y = 0; y < lines.length; y++) {
    points[y] = [];
    for(let x = 0; x < lines[y].length; x++) {
      points[y][x] = {x, y, obj: lines[y][x] as Obj};
    }
  }
  const map = new Map(points);
  const actions = actionsArea.split("").filter(Boolean) as Direction[];
  return {map, actions};
}

export class Map {

  constructor(public map: Point[][]) {}

  get robot() {
    return this.map.flat().find(({obj}) => obj === "@")!;
  }

  get boxes() {
    return this.map.flat().filter(({obj}) => obj === "O");
  }

  eval(d: Direction) {
    const robot = this.robot;
    const {x, y} = robot;
    let nx = x;
    let ny = y;
    switch(d) {
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
    if(nextObj === ".") {
      // just move
      this.map[y][x].obj = ".";
      this.map[ny][nx].obj = "@";
    } else if (nextObj === "O") {
      // push
      const ahead = this.ahead(d);
      const wallOrEmpty = ahead[ahead.length - 1];
      if (wallOrEmpty.obj === ".") {
        const empty = wallOrEmpty;
        this.map[y][x].obj = ".";
        this.map[ny][nx].obj = "@";
        this.map[empty.y][empty.x].obj = "O";
      }
    }
  }

  prints() {
    for(let i = 0; i < this.map.length; i++) {
      let line = "";
      for(let j = 0; j < this.map[i].length; j++) {
        line += this.map[i][j].obj;
      }
      console.log(line);
    }
  }

  private ahead(d: Direction): Point[] {
    let points: Point[] = [];
    const robot = this.robot;
    let next = this.next(robot, d);
    while (next) {
      points.push(next);
      if(next.obj === "#" || next.obj === ".") break;
      next = this.next(next, d);
    }
    return points;
  }

  private next(from: Point, d: Direction): Point | undefined {
    const {x, y} = from;
    let nx = x;
    let ny = y;
    switch(d) {
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
}

export class Player {
  constructor(public map: Map) {}

  async start() {
    while(true) {
      console.clear();
      this.map.print();
      const buf = new Uint8Array(8);
      const inp = await Deno.stdin.read(buf);
      // to string char
      const str = new TextDecoder().decode(buf.filter((b) => b !== 0)).trim();
      if(inp === null || str === "quit") break;
      const d = this.convert(str);
      if (d) this.map.eval(d);
    }
  }

  convert(input: string): Direction | undefined {
    switch(input) {
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

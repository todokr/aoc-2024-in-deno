import { BinaryHeap } from "@std/data-structures/binary-heap";

type Tile = {
  x: number;
  y: number;
}
export type Node = {
  x: number;
  y: number;
  xMove: number;
  yMove: number;
  cost: number;
  path: Set<Tile>;
}
export const load = (input: string): {map: string[][], start: Node} => {
  const map = input.split("\n").map((line) => [...line]);
  const startY = map.findIndex((row) => row.includes("S"));
  const startX = map[startY].findIndex((c) => c === "S");
  const path = new Set([{x: startX, y: startY}]);
  const start = {x: startX, y: startY, xMove: 1, yMove: 0, cost: 0, path };
  return {map, start};
}

export const dijkstra = (map: string[][], start: Node): number | undefined => {
  const visited = new Set();
  const queue = new BinaryHeap<Node>(({ cost: a }, { cost: b }) => a - b);
  queue.push(start);

  while (queue.length) {
    const { x, y, xMove, yMove, cost, path } = queue.pop()!;
    const hash = `${x}-${y}-${xMove}-${yMove}`;
    if (visited.has(hash)) continue;
    visited.add(hash);
    if (map[y][x] === "E") {
      console.log('path', path);
      return cost
    };
    if (map[y + yMove]?.[x + xMove] !== "#") {
      const nx = x + xMove;
      const ny = y + yMove;
      const np = path.add({x: nx, y: ny});
      queue.push({ x: nx, y: ny, xMove, yMove, cost: cost + 1, path: np });
    }
    // turn
    for (const [ndx, ndy] of [[-yMove, xMove], [yMove, -xMove]]) {
      if (map[y + ndy]?.[x + ndx] !== "#") {
        queue.push({ x: x, y: y, xMove: ndx, yMove: ndy, cost: cost + 1000, path });
      }
    }
  }
}

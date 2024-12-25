import { BinaryHeap } from "@std/data-structures/binary-heap";

export type Node = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  cost: number;
}
export const load = (input: string): {map: string[][], start: Node} => {
  const map = input.split("\n").map((line) => [...line]);
  const startY = map.findIndex((row) => row.includes("S"));
  const startX = map[startY].findIndex((c) => c === "S");
  const start = {x: startX, y: startY, dx: 1, dy: 0, cost: 0 };
  return {map, start};
}

export const dijkstra = (map: string[][], start: Node) => {
  const visited = new Set();
  const queue = new BinaryHeap<Node>(({ cost: a }, { cost: b }) => a - b);
  queue.push(start);

  while (queue.length) {
    const { x, y, dx, dy, cost } = queue.pop()!;
    const hash = `${x}-${y}-${dx}-${dy}`;
    if (visited.has(hash)) continue;
    visited.add(hash);
    if (map[y][x] === "E") return cost;
    if (map[y + dy]?.[x + dx] !== "#") {
      queue.push({ x: x + dx, y: y + dy, dx, dy, cost: cost + 1 });
    }
    // turn
    for (const [ndx, ndy] of [[-dy, dx], [dy, -dx]]) {
      if (map[y + ndy]?.[x + ndx] !== "#") {
        queue.push({ x: x, y: y, dx: ndx, dy: ndy, cost: cost + 1000 });
      }
    }
  }
}

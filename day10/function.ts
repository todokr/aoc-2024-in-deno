export type Cell = { x: number; y: number; z: number };

export const load = (input: string): { map: Cell[][]; trailHeads: Cell[] } => {
  const lines = input.split("\n").filter(Boolean);
  const map: Cell[][] = [];
  const trailHeads: Cell[] = [];
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    map[y] = [];
    for (let x = 0; x < line.length; x++) {
      const z = +line[x];
      const cell = { x, y, z };
      map[y].push(cell);
      if (z === 0) {
        trailHeads.push(cell);
      }
    }
  }
  return { map, trailHeads };
};

export const aroundCell =
  (map: Cell[][]) => (current: { x: number; y: number }): Cell[] => {
    const around: Cell[] = [];
    const { x, y } = current;
    const points = [
      { x, y: y - 1 },
      { x, y: y + 1 },
      { x: x - 1, y },
      { x: x + 1, y },
    ];
    for (const point of points) {
      if (map[point.y] && map[point.y][point.x]) {
        around.push(map[point.y][point.x]);
      }
    }
    return around;
  };

export const countPath = (map: Cell[][], trailHeads: Cell[]): number => {
  const arounder = aroundCell(map);
  const _loop = (current: Cell, round: number): Cell[] => {
    const around = arounder(current);
    const thisTime = around.filter(({ z }) => z === round);

    if (round < 9) {
      return thisTime.flatMap((cell) => _loop(cell, round + 1));
    } else {
      return thisTime;
    }
  };
  return trailHeads
    .map((head) => _loop(head, 1))
    .reduce((acc, ends) => acc + new Set(ends).size, 0);
};

export type Point = { x: number; y: number };
export type Antenna = { freq: string } & Point;

export const frequencies = (input: string): string[] =>
  Array.from(new Set(input.match(/\w/g)));

export const calcPairs = (points: Point[]): [Point, Point][] => {
  const [_, ...rest] = points;
  const initial: { pairs: [Point, Point][]; rest: Point[] } = {
    pairs: [],
    rest,
  };
  return points.reduce(({ pairs, rest }, p) => {
    const combi = rest.map((r) => [p, r] as [Point, Point]);
    return {
      pairs: [...pairs, ...combi],
      rest: rest.slice(1),
    };
  }, initial).pairs;
};

export const calcAntinodes = (p1: Point, p2: Point): [Point, Point] => {
  let a, b: Point;
  if (p1.y < p2.y || p1.x < p2.x) {
    a = p1;
    b = p2;
  } else {
    a = p2;
    b = p1;
  }
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return [
    { x: a.x - dx, y: a.y - dy },
    { x: b.x + dx, y: b.y + dy },
  ];
};

export const calcInfAntinodes =
  (width: number, height: number) => (p1: Point, p2: Point): Point[] => {
    const expander = expand(width, height);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const expand1 = expander(p1, dx, dy);
    const expand2 = expander(p2, -dx, -dy);
    return [...expand1, ...expand2];
  };

export const expand =
  (width: number, height: number) =>
  ({ x, y }: Point, dx: number, dy: number): Point[] => {
    const result: Point[] = [];
    let current = { x: x + dx, y: y + dy };
    while (isWithin(width, height)(current)) {
      result.push(current);
      current = { x: current.x + dx, y: current.y + dy };
    }
    return result;
  };

export const isWithin =
  (width: number, height: number) => ({ x, y }: Point): boolean =>
    x >= 0 && x < width && y >= 0 && y < height;

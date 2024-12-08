type Point = {
  x: number;
  y: number;
};

type Cell = { freq?: string } & Point;

export const frequencies = (input: string): string[] =>
  Array.from(new Set(input.match(/\w/g)));

export const pairs = (points: Point[]): [Point, Point][] => {
  const [_, ...rest] = points;
  const initial: { pairs: [Point, Point][]; rest: Point[] } = {
    pairs: [],
    rest
  };
  return points.reduce(({pairs, rest}, p) => {
    const combi = rest.map(r => [p, r] as [Point, Point]);
    return {
      pairs: [...pairs, ...combi],
      rest: rest.slice(1)
    };
  }, initial).pairs;
};

export const antinodes = (p1: Point, p2: Point): [Point, Point] => {
  let a, b: Point;
  if (p1.y < p2.y || p1.x < p2.x) {
    a = p1;
    b = p2;
  } else {
    a = p2;
    b = p1;
  }
  console.log(a, b);
  return [
    { x: p1.x, y: p2.y },
    { x: p2.x, y: p1.y },
  ];
};

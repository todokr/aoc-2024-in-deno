export const extract = (table: string[][]): string[] => {
  return [
    ...row(table),
    ...column(table),
    ...backslash(table),
    ...slash(table),
  ];
};

const row = (table: string[][]): string[] => table.flatMap((row) => [
  row.join(''),
  row.reverse().join('')
]);
const column = (table: string[][]): string[] => row(transpose(table));

export const backslash = (table: string[][]): string[] => diagonal(table);
export const slash = (table: string[][]): string[] => diagonal(table, true);

const diagonal = (table: string[][], inverse: boolean = false): string[] => {
  const colCount = table[0].length;
  const rowCount = table.length;

  const points: { x: number; y: number; char: string }[] = [];
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      points.push({ x: j, y: i, char: table[i][j] });
    }
  }

  const groupingFn = (x: number, y: number) => inverse ? x + y : x - y;

  const grouped = Map.groupBy(points, ({ x, y }) => `${groupingFn(x, y)}`);
  const result = grouped.values().flatMap((grp) => {
    const chars = grp.map(({char}) => char);
    return [chars.join(''), chars.reverse().join('')];
  });

  return Array.from(result);
};

export const transpose = (table: string[][]): string[][] => {
  const colCount = table[0].length;
  const rowCount = table.length;
  const transponsed: string[][] = Array.from({ length: colCount }, () => {
    return Array.from({ length: rowCount }, () => "");
  });
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      transponsed[j][i] = table[i][j];
    }
  }
  return transponsed;
};

export const count = (candidates: string[], pattern: RegExp): number => {
  const count = candidates.reduce((acc, candidate) => {
    const c = candidate.match(pattern)?.length || 0;
    return acc + c;
  }, 0);
  return count;
};

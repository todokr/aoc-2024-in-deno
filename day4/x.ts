export type Cornar = {
  lt?: string;
  rt?: string;
  lb?: string;
  rb?: string;
}

export const finder = (table: string[][]) => {
  return (arg: {x: number, y: number}): Cornar => {
    const {x, y} = arg;
    return {
      lt: table[y - 1]?.[x - 1],
      rt: table[y - 1]?.[x + 1],
      lb: table[y + 1]?.[x - 1],
      rb: table[y + 1]?.[x + 1],
    };
  }
}

export const detect = (cornar: Cornar): boolean => {
  const {lt, rt, lb, rb} = cornar;
  const isSlash = [[rt, lb], [lb, rt]].some(([a, b]) => a === 'M' && b === 'S');
  const isBackslash = [[lt, rb], [rb, lt]].some(([a, b]) => a === 'M' && b === 'S');
  return isSlash && isBackslash;
}

export const count = (table: string[][]): number => {
  const find = finder(table);

  let count = 0;
  for (let y = 0; y < table.length; y++) {
    for (let x = 0; x < table[y].length; x++) {
      if (table[y][x] === 'A') {
        const cornar = find({x, y});
        if (detect(cornar)) {
          count++;
        }
      }
    }
  }

  return count;
}

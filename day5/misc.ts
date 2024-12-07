export const parseInput = (
  input: string,
): { rules: [number, number][]; updates: number[][] } => {
  const [ruleSect, updateSect] = input.split("\n\n");
  const rules = ruleSect.split("\n").map((line) => {
    return line.split("|").map(Number) as [number, number]; // a rule
  });
  const updates = updateSect.split("\n").map((line) => {
    return line.split(",").map(Number);
  });
  return { rules, updates };
};

export const comparator =
  (rules: [number, number][]) => (a: number, b: number) => {
    for (const [prev, next] of rules) {
      if (a === prev && b === next) return -1;
      if (a === next && b === prev) return 1;
    }
    return 0;
  };

export const isEqual = (arr1: number[], arr2: number[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  for (const [i, v] of arr1.entries()) {
    if (v !== arr2[i]) return false;
  }
  return true;
};

export const takeMiddle = (arr: number[]): number => {
  if (arr.length % 2 === 0) {
    throw new Error("must have odd length");
  }
  return arr[Math.floor(arr.length / 2)];
};

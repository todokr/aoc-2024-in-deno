const Threshold = 3;

export const isSafe = (xs: number[]): boolean => {
  const [first, second, ...rest] = xs;
  const mode = first < second ? "incr" : "decr";
  let prev = first;
  for (const x of [second, ...rest]) {
    const diff = Math.abs(x - prev);
    if (diff === 0 || diff > Threshold) return false;
    if (mode === "incr" && x < prev) return false;
    if (mode === "decr" && x > prev) return false;
    prev = x;
  }
  return true;
};

export const isSafeWithDampener = (xs: number[]): boolean => {
  if (isSafe(xs)) return true;
  // remove an element and see if it becomes safe
  for (const [i] of xs.entries()){
    const removed = xs.toSpliced(i, 1);
    if (isSafe(removed)) return true;
  }
  return false;
}

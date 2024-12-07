export function input(file: string): { left: number[]; right: number[] } {
  const input = Deno.readFileSync(file);
  const lines = new TextDecoder("utf-8").decode(input).split("\n");
  const left: number[] = [];
  const right: number[] = [];
  for (const line of lines) {
    const [l, r] = line.split(/\s+/);
    if (line) {
      left.push(+l);
      right.push(+r);
    }
  }

  return { left, right };
}

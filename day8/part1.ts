const input = Deno.readTextFileSync("test.txt");
const lines = input.split("\n").filter(Boolean);



const antennas: Point[] = [];
const map: Cell[][] = [];
for(const [y, line] of lines.entries()) {
  map[y] = [];
  for(const [x, char] of line.split("").entries()) {
    const freq  = /\w/.test(char) ? char : undefined;
    if (freq) antennas.push({ x, y });
    map[y][x] = { x, y, freq };
  }
}

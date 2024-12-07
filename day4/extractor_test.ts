import { assertEquals } from "@std/assert";
import { extract, transpose, slash, backslash } from "./extractor.ts";

Deno.test("transpose", () => {
  const input = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"]
  ];
  const expected = [
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"]
  ];

  assertEquals(transpose(input), expected);
});

Deno.test("slash", () => {
  const input = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"]
  ];
  const expected = [
    "1",
    "24",
    "357",
    "68",
    "9",
    "9",
    "86",
    "753",
    "42",
    "1"
  ];
  assertEquals(slash(input).toSorted(), expected.toSorted());
});

Deno.test("backslash", () => {
  const input = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"]
  ];
  const expected = [
    "3",
    "26",
    "159",
    "48",
    "7",
    "7",
    "84",
    "951",
    "62",
    "3"
  ];
  assertEquals(backslash(input).toSorted(), expected.toSorted());
});

Deno.test("count", () => {
  const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.split("\n").map((line) => line.split(""));
  const Pattern = /XMAS/g;

  const candidates = extract(input);
  const count = candidates.reduce((acc, candidate) => {
    const c = candidate.match(Pattern)?.length || 0;
    return acc + c;
  }, 0);

  assertEquals(count, 18);
});

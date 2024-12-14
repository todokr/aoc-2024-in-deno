import {
  calcAntinodes,
  calcInfAntinodes,
  calcPairs,
  expand,
  frequencies,
} from "./functions.ts";
import { assertEquals } from "@std/assert";

Deno.test("frequencies", () => {
  const input = "abcABC123abc.";
  const actual = frequencies(input);
  assertEquals(
    new Set(actual),
    new Set(["a", "b", "c", "A", "B", "C", "1", "2", "3"]),
  );
});

Deno.test("calcAntinodes", () => {
  const tests = [
    {
      p1: { x: 1, y: 1 },
      p2: { x: 2, y: 2 },
      expected: [{ x: 0, y: 0 }, { x: 3, y: 3 }],
    },
    {
      p1: { x: 2, y: 2 },
      p2: { x: 2, y: 3 },
      expected: [{ x: 2, y: 1 }, { x: 2, y: 4 }],
    },
    {
      p1: { x: 3, y: 2 },
      p2: { x: 2, y: 3 },
      expected: [{ x: 1, y: 4 }, { x: 4, y: 1 }],
    },
    {
      p1: { x: 2, y: 3 },
      p2: { x: 3, y: 3 },
      expected: [{ x: 1, y: 3 }, { x: 4, y: 3 }],
    },
  ];
  for (const test of tests) {
    const actual = calcAntinodes(test.p1, test.p2);
    assertEquals(new Set(actual), new Set(test.expected));
  }
});

Deno.test("calcInfAntinodes", () => {
  const searcher = calcInfAntinodes(11, 11);
  const actual = searcher({x: 5, y: 4}, {x: 4, y :5});
  const expected = [
    {x: 0, y: 9},
    {x: 1, y: 8},
    {x: 2, y: 7},
    {x: 3, y: 6},
    {x: 4, y: 5},
    {x: 5, y: 4},
    {x: 6, y: 3},
    {x: 7, y: 2},
    {x: 8, y: 1},
    {x: 9, y: 0}
  ];
  assertEquals(new Set(actual), new Set(expected));
});

Deno.test("expand", () => {
  const expander = expand(10, 10);
  const actual = expander({ x: 4, y: 4 }, -1, 1);
  const expected = [
    { x: 3, y: 5 },
    { x: 2, y: 6 },
    { x: 1, y: 7 },
    { x: 0, y: 8 }
  ];
  assertEquals(new Set(actual), new Set(expected));
});

Deno.test("pairs", () => {
  const ponts = [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
  ];
  const actual = calcPairs(ponts);
  const expected = [
    [{ x: 1, y: 1 }, { x: 2, y: 2 }],
    [{ x: 1, y: 1 }, { x: 3, y: 3 }],
    [{ x: 1, y: 1 }, { x: 4, y: 4 }],
    [{ x: 2, y: 2 }, { x: 3, y: 3 }],
    [{ x: 2, y: 2 }, { x: 4, y: 4 }],
    [{ x: 3, y: 3 }, { x: 4, y: 4 }],
  ];
  assertEquals(new Set(actual), new Set(expected));
});

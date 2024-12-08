import { antinodes, frequencies, pairs } from "./functions.ts";
import { assertEquals } from "@std/assert";

Deno.test("frequencies", () => {
  const input = "abcABC123abc.";
  const actual = frequencies(input);
  assertEquals(new Set(actual), new Set(["a", "b", "c", "A", "B", "C", "1", "2", "3"]));
});

Deno.test("antinodes", () => {
  const tests = [
    {p1: {x: 1, y: 1}, p2: {x: 2, y: 2}, expected: [{x: 0, y: 0}, {x: 3, y: 3}]},
    {p1: {x: 3, y: 3}, p2: {x: 2, y: 2}, expected: [{x: 0, y: 0}, {x: 3, y: 3}]},
    {p1: {x: 3, y: 2}, p2: {x: 2, y: 2}, expected: [{x: 0, y: 0}, {x: 3, y: 3}]},
    {p1: {x: 2, y: 3}, p2: {x: 2, y: 2}, expected: [{x: 0, y: 0}, {x: 3, y: 3}]},
  ];
  for (const test of tests) {
    const actual = antinodes(test.p1, test.p2);
    //    assertEquals(new Set(actual), new Set(test.expected));
  }
});

Deno.test("pairs", () => {
  const ponts = [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}];
  const actual = pairs(ponts);
  const expected = [
    [{x:1, y:1 }, {x:2, y:2 }],
    [{x:1, y:1 }, {x:3, y:3 }],
    [{x:2, y:2 }, {x:3, y:3 }]
  ];
  assertEquals(new Set(actual), new Set(expected));
});

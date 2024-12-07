import { assertEquals } from "@std/assert";
import { count, finder, detect, type Cornar } from "./x.ts";
const table = [
  ["a1", "a2", "a3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"]
];

const find = finder(table);

Deno.test("get cornar", () => {
  const tests = [
    {x: 0, y: 0, expected: {lt: undefined, rt: undefined, lb: undefined, rb: "b2"}},
    {x: 1, y: 0, expected: {lt: undefined, rt: undefined, lb: "b1", rb: "b3"}},
    {x: 2, y: 0, expected: {lt: undefined, rt: undefined, lb: "b2", rb: undefined}},
    {x: 0, y: 1, expected: {lt: undefined, rt: "a2", lb: undefined, rb: "c2"}},
    {x: 1, y: 1, expected: {lt: "a1", rt: "a3", lb: "c1", rb: "c3"}},
    {x: 2, y: 1, expected: {lt: "a2", rt: undefined, lb: "c2", rb: undefined}},
    {x: 0, y: 2, expected: {lt: undefined, rt: "b2", lb: undefined, rb: undefined}},
    {x: 1, y: 2, expected: {lt: "b1", rt: "b3", lb: undefined, rb: undefined}},
    {x: 2, y: 2, expected: {lt: "b2", rt: undefined, lb: undefined, rb: undefined}},
  ];

  for (const test of tests) {
    const actual = find({ x: test.x, y: test.y });
    assertEquals(actual, test.expected);
  }
});

Deno.test("detect", () => {
  const tests: {data: Cornar, expected: boolean }[] = [
    {
      data: {
        lt: "M", rt: "M",
        lb: "S", rb: "S"
      },
      expected: true
    },
    {
      data: {
        lt: "M", rt: "S",
        lb: "M", rb: "S"
      },
      expected: true
    },
    {
      data: {
        lt: "M", rt: "-",
        lb: "-", rb: "S"
      },
      expected: false
    },
    {
      data: {
        lt: "S", rt: "-",
        lb: "-", rb: "M"
      },
      expected: false
    },
    {
      data: {
        lt: "M", rt: "S",
        lb: "S", rb: "M"
      },
      expected: false
    }
  ];

  for (const test of tests) {
    const actual = detect(test.data);
    assertEquals(actual, test.expected);
  }
});

Deno.test("count", () => {
  const input = Deno.readTextFileSync("test.txt");
  const lines = input.split("\n").filter(Boolean);
  const table = lines.map((line) => line.split(""));
  assertEquals(count(table), 9);
});

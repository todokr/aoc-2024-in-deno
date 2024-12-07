import { assertEquals } from "@std/assert";
import { comparator, isEqual, takeMiddle } from "./misc.ts";

Deno.test("isEqual", () => {
  const tests = [
    { arr1: [1, 2, 3], arr2: [1, 2, 3], expected: true },
    { arr1: [1, 2, 3], arr2: [1, 2, 4], expected: false },
    { arr1: [1, 2, 3], arr2: [1, 2], expected: false },
  ];

  tests.forEach(({ arr1, arr2, expected }) => {
    assertEquals(isEqual(arr1, arr2), expected);
  });
});

Deno.test("comparator", () => {
  const input = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`;

  const rules: [number, number][] = input
    .split("\n")
    .map((line) => line.split("|").map(Number) as [number, number]);

  const fn = comparator(rules);
  const tests = [
    { input: [75, 47, 61, 53, 29], expected: true },
    { input: [97, 61, 53, 29, 13], expected: true },
    { input: [75, 29, 13], expected: true },
    { input: [75, 97, 47, 61, 53], expected: false },
    { input: [61, 13, 29], expected: false },
    { input: [97, 13, 75, 29, 47], expected: false },
  ];
  for (const { input, expected } of tests) {
    const actual = isEqual(input.toSorted(fn), input);
    assertEquals(actual, expected);
  }
});

Deno.test("takeMiddle", () => {
  const input = [1, 2, 3];
  const actual = takeMiddle(input);
  assertEquals(actual, 2);
});

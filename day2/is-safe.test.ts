import { assert } from "https://deno.land/std@0.224.0/assert/assert.ts";
import { isSafe, isSafeWithDampener } from "./is-safe.ts";

Deno.test("isSafe", () => {
  const tests = [
    { input: [7, 6, 4, 2, 1], expected: true },
    { input: [1, 2, 7, 8, 9], expected: false },
    { input: [9, 7, 6, 2, 1], expected: false },
    { input: [1, 3, 2, 4, 5], expected: false },
    { input: [8, 6, 4, 4, 1], expected: false },
    { input: [1, 3, 6, 7, 9], expected: true },
  ];
  for (const test of tests) {
    const actual = isSafe(test.input);
    assert(actual === test.expected, `${test.input}: ${test.expected}`);
  }
});


Deno.test("isSafeWithDampener", () => {
  const tests = [
    { input: [7, 6, 4, 2, 1], expected: true },
    { input: [1, 2, 7, 8, 9], expected: false },
    { input: [9, 7, 6, 2, 1], expected: false },
    { input: [1, 3, 2, 4, 5], expected: true },
    { input: [8, 6, 4, 4, 1], expected: true },
    { input: [1, 3, 6, 7, 9], expected: true },
  ];
  for (const test of tests) {
    const actual = isSafeWithDampener(test.input);
    assert(actual === test.expected, `${test.input}: ${test.expected}`);
  }
});

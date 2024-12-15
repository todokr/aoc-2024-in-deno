import { assertEquals } from "@std/assert";
import { applyBlink, split } from "./function.ts";

Deno.test("applyBlink", () => {
  const tests = [
    { input: { no: 0 }, expected: [{ no: 1 }] },
    { input: { no: 10 }, expected: [{ no: 1 }, { no: 0 }] },
    { input: { no: 1001 }, expected: [{ no: 10 }, { no: 1 }] },
    { input: { no: 2 }, expected: [{ no: 4048 }] },
  ];
  for (const test of tests) {
    const actual = applyBlink(test.input);
    assertEquals(actual, test.expected, `${JSON.stringify(test.input)}`);
  }
});

Deno.test("split", () => {
  const tests = [
    {input: 1001, expected: [10, 1] },
  ];
  for (const test of tests) {
    const actual = split(test.input);
    assertEquals(actual, test.expected, `${JSON.stringify(test.input)}`);
  }
});

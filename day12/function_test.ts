import { assertEquals } from "@std/assert";
import { IdGenerator, splitByBlank } from "./function.ts";

Deno.test("IdGenerator", () => {
  const generator = new IdGenerator();
  assertEquals(generator.get("a"), "a-0");
  assertEquals(generator.inc("a"), "a-1");
  assertEquals(generator.inc("b"), "b-0");
  assertEquals(generator.get("b"), "b-0");
});

Deno.test("splitByBlank", () => {
  const tests = [
    {
      input: [
        { plantKind: "a", x: 1, y: 1 },
        { plantKind: "a", x: 2, y: 3 },
        { plantKind: "a", x: 3, y: 5 },
      ],
      side: "top" as const,
      output: [
        [
          { plantKind: "a", x: 1, y: 1 },
          { plantKind: "a", x: 2, y: 3 },
          { plantKind: "a", x: 3, y: 5 },
        ],
      ],
    },
    {
      input: [
        { plantKind: "a", x: 1, y: 0 },
        { plantKind: "a", x: 3, y: 0 },
        { plantKind: "a", x: 4, y: 0 },
      ],
      side: "top" as const,
      output: [
        [
          { plantKind: "a", x: 1, y: 0 },
        ],
        [
          { plantKind: "a", x: 3, y: 0 },
          { plantKind: "a", x: 4, y: 0 },
        ],
      ],
    },

    {
      input: [
        { plantKind: "a", x: 0, y: 1 },
        { plantKind: "a", x: 0, y: 2 },
        { plantKind: "a", x: 0, y: 4 },
      ],
      side: "left" as const,
      output: [
        [
          { plantKind: "a", x: 0, y: 1 },
          { plantKind: "a", x: 0, y: 2 },
        ],
        [
          { plantKind: "a", x: 0, y: 4 },
        ],
      ],
    },
  ];
  for (const test of tests) {
    assertEquals(splitByBlank(test.input, test.side), test.output);
  }
});

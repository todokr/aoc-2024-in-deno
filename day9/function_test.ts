import { assertEquals } from "@std/assert";
import { asArray, checksum, decode, defrag, findSpace } from "./function.ts";

Deno.test("decode", () => {
  const tests = [
    {
      input: "123",
      expected: [{ id: 0, size: 1 }, { size: 2 }, { id: 1, size: 3 }],
    },
  ];
  tests.forEach((test) => {
    assertEquals(decode(test.input), test.expected);
  });
});

Deno.test("asArray", () => {
  const tests = [
    {
      input: [{ id: 0, size: 1 }, { size: 2 }, { id: 1, size: 3 }],
      expected: "0..111",
    },
  ];
  tests.forEach((test) => {
    assertEquals(asArray(test.input).join(""), test.expected);
  });
});

Deno.test("defrag", () => {
  const tests = [
    {
      input: "0.1",
      expected: "01.",
    },
    {
      input: "0..111....22222",
      expected: "022111222......",
    },
    {
      input: "00...111...2...333.44.5555.6666.777.888899",
      expected: "0099811188827773336446555566..............",
    },
  ];
  tests.forEach((test) => {
    assertEquals(defrag(test.input.split("")).join(""), test.expected);
  });
});

Deno.test("checksum", () => {
  const input = "0099811188827773336446555566..............";
  const actual = checksum(input.split(""));
  assertEquals(actual, 1928);
});

Deno.test("findSpace", () => {
  const contents = [{ id: "A", size: 2 }, { size: 2 }, { id: "B", size: 2 }];
  const actual = findSpace(contents, 2);
  assertEquals(actual, 1);
});

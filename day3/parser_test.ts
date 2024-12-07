import { assertEquals } from "jsr:@std/assert";
import {
  compose,
  DontPattern,
  DoPattern,
  evaluate,
  MulPattern,
  type Op,
  parse,
} from "./parser.ts";

Deno.test("parse", () => {
  const input =
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
  const actual = parse(input);

  const expected: Op[] = [
    { code: "mul", left: 2, right: 4 },
    { code: "dont" },
    { code: "mul", left: 5, right: 5 },
    { code: "mul", left: 11, right: 8 },
    { code: "do" },
    { code: "mul", left: 8, right: 5 },
  ];

  assertEquals(actual, expected);
});

Deno.test("evaluate", () => {
  const input: Op = { code: "mul", left: 3, right: 4 };
  assertEquals(evaluate(input), 12);
});

Deno.test("compose", () => {
  const input = "xmul(3,4)ydo()zdon't()a";
  const pattern = compose([MulPattern, DoPattern, DontPattern]);
  const actual = [];
  for (const m of input.matchAll(pattern)) {
    actual.push(m[0]);
  }
  const expected = [
    "mul(3,4)",
    "do()",
    "don't()",
  ];
  assertEquals(actual, expected);
});

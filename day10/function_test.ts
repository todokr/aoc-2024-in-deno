import { assertEquals } from "@std/assert";
import { aroundCell, countPath } from "./function.ts";

const map = [
  [
    { x: 0, y: 0, z: 8 },
    { x: 1, y: 0, z: 9 },
    { x: 2, y: 0, z: 0 },
    { x: 3, y: 0, z: 1 },
    { x: 4, y: 0, z: 0 },
    { x: 5, y: 0, z: 1 },
    { x: 6, y: 0, z: 2 },
    { x: 7, y: 0, z: 3 },
  ],
  [
    { x: 0, y: 1, z: 7 },
    { x: 1, y: 1, z: 8 },
    { x: 2, y: 1, z: 1 },
    { x: 3, y: 1, z: 2 },
    { x: 4, y: 1, z: 1 },
    { x: 5, y: 1, z: 8 },
    { x: 6, y: 1, z: 7 },
    { x: 7, y: 1, z: 4 },
  ],
  [
    { x: 0, y: 2, z: 8 },
    { x: 1, y: 2, z: 7 },
    { x: 2, y: 2, z: 4 },
    { x: 3, y: 2, z: 3 },
    { x: 4, y: 2, z: 0 },
    { x: 5, y: 2, z: 9 },
    { x: 6, y: 2, z: 6 },
    { x: 7, y: 2, z: 5 },
  ],
  [
    { x: 0, y: 3, z: 9 },
    { x: 1, y: 3, z: 6 },
    { x: 2, y: 3, z: 5 },
    { x: 3, y: 3, z: 4 },
    { x: 4, y: 3, z: 9 },
    { x: 5, y: 3, z: 8 },
    { x: 6, y: 3, z: 7 },
    { x: 7, y: 3, z: 4 },
  ],
  [
    { x: 0, y: 4, z: 4 },
    { x: 1, y: 4, z: 5 },
    { x: 2, y: 4, z: 6 },
    { x: 3, y: 4, z: 7 },
    { x: 4, y: 4, z: 8 },
    { x: 5, y: 4, z: 9 },
    { x: 6, y: 4, z: 0 },
    { x: 7, y: 4, z: 3 },
  ],
  [
    { x: 0, y: 5, z: 3 },
    { x: 1, y: 5, z: 2 },
    { x: 2, y: 5, z: 0 },
    { x: 3, y: 5, z: 1 },
    { x: 4, y: 5, z: 9 },
    { x: 5, y: 5, z: 0 },
    { x: 6, y: 5, z: 1 },
    { x: 7, y: 5, z: 2 },
  ],
  [
    { x: 0, y: 6, z: 0 },
    { x: 1, y: 6, z: 1 },
    { x: 2, y: 6, z: 3 },
    { x: 3, y: 6, z: 2 },
    { x: 4, y: 6, z: 9 },
    { x: 5, y: 6, z: 8 },
    { x: 6, y: 6, z: 0 },
    { x: 7, y: 6, z: 1 },
  ],
  [
    { x: 0, y: 7, z: 1 },
    { x: 1, y: 7, z: 0 },
    { x: 2, y: 7, z: 4 },
    { x: 3, y: 7, z: 5 },
    { x: 4, y: 7, z: 6 },
    { x: 5, y: 7, z: 7 },
    { x: 6, y: 7, z: 3 },
    { x: 7, y: 7, z: 2 },
  ],
];

Deno.test("arround", () => {
  const arounder = aroundCell(map);
  const tests = [
    {
      input: { x: 0, y: 0 },
      expected: [
        { x: 1, y: 0, z: 9 },
        { x: 0, y: 1, z: 7 },
      ],
    },
    {
      input: { x: 1, y: 1 },
      expected: [
        { x: 1, y: 0, z: 9 },
        { x: 1, y: 2, z: 7 },
        { x: 0, y: 1, z: 7 },
        { x: 2, y: 1, z: 1 },
      ],
    },
  ];

  for (const { input, expected } of tests) {
    assertEquals(new Set(arounder(input)), new Set(expected));
  }
});

Deno.test("countPath", () => {
  const trailHeads = map.flat().filter(({ z }) => z === 0);
  const actual = countPath(map, trailHeads);
  assertEquals(actual, 36);
});

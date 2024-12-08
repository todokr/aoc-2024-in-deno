import { Cell, Scene } from "./scene.ts";
import { assertEquals } from "@std/assert";

export const setup = (
  width: number,
  height: number,
  obstractions: { x: number; y: number }[],
  guard: { x: number; y: number },
): Scene => {
  const map: Cell[][] = [];
  for (let y = 0; y < height; y++) {
    map.push([]);
    for (let x = 0; x < width; x++) {
      const obstraction = obstractions.some((o) => o.x === x && o.y === y);
      const cell = { x, y, obstraction };
      map[y].push(cell);
    }
  }
  return new Scene(map, { ...guard, direction: "up" });
};

Deno.test("draw", () => {
  const obstractions = [
    { x: 1, y: 1 },
    { x: 7, y: 2 },
    { x: 6, y: 7 },
  ];
  const width = 10;
  const height = 10;
  const scene = setup(width, height, obstractions, { x: 1, y: 3 });

  const expected = [
    { x: 1, y: 3, direction: "up", state: "ongoing" },
    { x: 1, y: 2, direction: "up", state: "ongoing" },
    { x: 1, y: 2, direction: "right", state: "ongoing" },
    { x: 2, y: 2, direction: "right", state: "ongoing" },
    { x: 3, y: 2, direction: "right", state: "ongoing" },
    { x: 4, y: 2, direction: "right", state: "ongoing" },
    { x: 5, y: 2, direction: "right", state: "ongoing" },
    { x: 6, y: 2, direction: "right", state: "ongoing" },
    { x: 6, y: 2, direction: "down", state: "ongoing" },
    { x: 6, y: 3, direction: "down", state: "ongoing" },
    { x: 6, y: 4, direction: "down", state: "ongoing" },
    { x: 6, y: 5, direction: "down", state: "ongoing" },
    { x: 6, y: 6, direction: "down", state: "ongoing" },
    { x: 6, y: 6, direction: "left", state: "ongoing" },
    { x: 5, y: 6, direction: "left", state: "ongoing" },
    { x: 4, y: 6, direction: "left", state: "ongoing" },
    { x: 3, y: 6, direction: "left", state: "ongoing" },
    { x: 2, y: 6, direction: "left", state: "ongoing" },
    { x: 1, y: 6, direction: "left", state: "ongoing" },
    { x: 0, y: 6, direction: "left", state: "ongoing" },
    { x: 0, y: 6, direction: "left", state: "finished" },
  ];

  for (const { x, y, direction, state } of expected) {
    console.log("=====================");
    assertEquals(scene.state, state);
    scene.draw();
    assertEquals(scene.guard.x, x);
    assertEquals(scene.guard.y, y);
    assertEquals(scene.guard.direction, direction);
    scene.next();
  }
});

Deno.test("draw", () => {
  const obstractions = [
    { x: 1, y: 1 },
    { x: 3, y: 2 },
    { x: 2, y: 4 },
    { x: 0, y: 3 },
  ];
  const width = 10;
  const height = 10;
  const scene = setup(width, height, obstractions, { x: 1, y: 3 });

  const expected = [
    { x: 1, y: 3, direction: "up", state: "ongoing" },
    { x: 1, y: 2, direction: "up", state: "ongoing" },
    { x: 1, y: 2, direction: "right", state: "ongoing" },
    { x: 2, y: 2, direction: "right", state: "ongoing" },
    { x: 2, y: 2, direction: "down", state: "ongoing" },
    { x: 2, y: 3, direction: "down", state: "ongoing" },
    { x: 2, y: 3, direction: "left", state: "ongoing" },
    { x: 1, y: 3, direction: "left", state: "ongoing" },
    { x: 1, y: 3, direction: "up", state: "ongoing" },
    { x: 1, y: 2, direction: "up", state: "abyss" },
  ];

  for (const { x, y, direction, state } of expected) {
    console.log("=====================");
    assertEquals(scene.state, state);
    scene.draw();
    assertEquals(scene.guard, { x, y, direction });
    scene.next();
  }
});

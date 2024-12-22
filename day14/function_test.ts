import { assertEquals } from "@std/assert";
import { Robot } from "./function.ts";

Deno.test("move positive", () => {
  let robot = new Robot({
    point: { x: 0, y: 0 },
    velocity: { x: 1, y: 1 },
  });

  robot.move(3, 3);
  assertEquals(robot.point, { x: 1, y: 1 });

  robot.move(3, 3);
  assertEquals(robot.point, { x: 2, y: 2 });

  robot.move(3, 3);
  assertEquals(robot.point, { x: 0, y: 0 });
});

Deno.test("move negative", () => {
  let robot = new Robot({
    point: { x: 0, y: 0 },
    velocity: { x: -1, y: -1 },
  });

  robot.move(3, 3);
  assertEquals(robot.point, { x: 2, y: 2 });

  robot.move(3, 3);
  assertEquals(robot.point, { x: 1, y: 1 });

  robot.move(3, 3);
  assertEquals(robot.point, { x: 0, y: 0 });

  robot.move(3, 3);
  assertEquals(robot.point, { x: 2, y: 2 });
});

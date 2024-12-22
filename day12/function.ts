export type Plant = {
  x: number;
  y: number;
  plantKind: string;
};

export type Fenced = Plant & {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

export const load = (input: string): Fenced[][] => {
  const lines = input.split("\n").filter(Boolean);
  const plants: Plant[][] = [];
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    plants[y] = [];
    for (let x = 0; x < line.length; x++) {
      const plant = { x, y, plantKind: line[x] };
      plants[y].push(plant);
    }
  }
  const idGen = new IdGenerator();
  const fencing = calcFences(plants, idGen);
  const map: Fenced[][] = [];
  for (let y = 0; y < plants.length; y++) {
    map[y] = [];
    for (let x = 0; x < plants[y].length; x++) {
      const plant = plants[y][x];
      map[y].push(fencing(plant));
    }
  }
  return map;
};

const calcFences =
  (map: Plant[][], idGen: IdGenerator) => (plant: Plant): Fenced => {
    const { x, y, plantKind } = plant;
    const top = map[y - 1]?.[x];
    const bottom = map[y + 1]?.[x];
    const left = map[y]?.[x - 1];
    const right = map[y]?.[x + 1];
    const fences = {
      top: top?.plantKind !== plantKind,
      bottom: bottom?.plantKind !== plantKind,
      left: left?.plantKind !== plantKind,
      right: right?.plantKind !== plantKind,
    };

    return { ...plant, ...fences };
  };

export const splitByBlank = <T extends Plant>(
  fences: T[],
  side: Side,
): T[][] => {
  const result: T[][] = [];
  let current: T[] = [];
  const compareAxis: "x" | "y" = side === "top" || side === "bottom"
    ? "x"
    : "y";
  const sorted = fences.toSorted((a, b) => a[compareAxis] - b[compareAxis]);
  for (const fence of sorted) {
    if (current.length === 0) {
      current.push(fence);
    } else {
      const prev = current[current.length - 1];
      if (prev[compareAxis] + 1 === fence[compareAxis]) {
        current.push(fence);
      } else {
        result.push(current);
        current = [fence];
      }
    }
  }
  if (current.length) {
    result.push(current);
  }
  return result;
};

export const countFences = (plant: Fenced): number => {
  return [plant.top, plant.bottom, plant.left, plant.right].filter(Boolean)
    .length;
};

type Side = "top" | "bottom" | "left" | "right";
export const countSides = (plants: Fenced[]): number => {
  const countSide = (side: Side): number => {
    const candidates = plants.filter((p) => p[side]);
    const groupingAxis = side === "top" || side === "bottom" ? "y" : "x";

    const grouped = Array.from(
      Map.groupBy(candidates, (p) => p[groupingAxis]).values(),
    );
    const sides = grouped.flatMap((group) => splitByBlank(group, side));
    return sides.length;
  };

  return [
    countSide("top"),
    countSide("bottom"),
    countSide("left"),
    countSide("right"),
  ].reduce((acc, count) => acc + count, 0);
};

export const grouping = (
  plants: Fenced[][],
  idGen: IdGenerator,
): { [key: string]: Fenced[] } => {
  const listConnected = (plant: Fenced): Set<Fenced> => {
    const { x, y, plantKind } = plant;
    return new Set([
      plants[y - 1]?.[x],
      plants[y + 1]?.[x],
      plants[y]?.[x - 1],
      plants[y]?.[x + 1],
    ].filter((p) => p?.plantKind === plantKind));
  };

  const visited = new Set<Fenced>();
  const pickSameGroup = (plant: Fenced): Fenced[] => {
    if (visited.has(plant)) {
      return [];
    }
    visited.add(plant);
    const newConn = Array.from(listConnected(plant).difference(visited));
    if (newConn.length === 0) {
      return [plant];
    } else {
      return [plant, ...newConn.flatMap(pickSameGroup)];
    }
  };

  const groups: { [key: string]: Fenced[] } = {};
  for (const plant of plants.flat()) {
    const members = pickSameGroup(plant);
    if (members.length) {
      const kind = members[0].plantKind;
      const key = idGen.inc(kind);
      groups[key] = members;
    }
  }
  return groups;
};

export class IdGenerator {
  private plants: { [key: string]: number } = {};

  inc(plant: string): string {
    if (this.plants[plant] === undefined) {
      this.plants[plant] = 0;
    } else {
      this.plants[plant]++;
    }
    return `${plant}-${this.plants[plant]}`;
  }

  get(plant: string): string {
    if (this.plants[plant] === undefined) {
      this.plants[plant] = 0;
    }
    return `${plant}-${this.plants[plant]}`;
  }
}

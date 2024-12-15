export type Stone = { no: number };

export const applyBlink = (stone: Stone): Stone[] => {
  if (stone.no === 0) return [{ no: 1 }];

  const digitNum = `${stone.no}`.length;
  if (digitNum % 2 === 0) {
    const [left, right] = split(stone.no);
    return [{ no: left }, { no: right }];
  }

  return [{ no: stone.no * 2024 }];
};

export const split = (n: number): [number, number] => {
  const ns = `${n}`;
  const digitNum = ns.length;
  if (digitNum % 2 === 1) throw new Error(`odd digit number: $n`);
  const left = ns.slice(0, digitNum / 2);
  const right = ns.slice(digitNum / 2);
  return [parseInt(left, 10), parseInt(right, 10)];
};

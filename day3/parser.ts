export const MulPattern = /mul\(([0-9]+),([0-9]+)\)/g;
export const DoPattern = /do\(\)/g;
export const DontPattern = /don't\(\)/g;

export const compose = (rs: RegExp[]): RegExp => {
  return new RegExp(rs.map((r) => r.source).join("|"), "g");
};

const OpCodePattern = /^([\w']+)/;

export type Op = Mul | Do | Dont;
type Mul = {
  code: "mul";
  left: number;
  right: number;
};
type Do = {
  code: "do";
};
type Dont = {
  code: "dont";
};

export const parse = (input: string): Op[] => {
  const pattern = compose([MulPattern, DoPattern, DontPattern]);
  const matches = input.matchAll(pattern);

  const ops: Op[] = [];
  for (const match of matches) {
    const code = match[0].match(OpCodePattern)?.[1];
    switch (code) {
      case "mul": {
        const left = parseInt(match[1]);
        const right = parseInt(match[2]);
        ops.push({ code: "mul", left, right });
        break;
      }
      case "do": {
        ops.push({ code: "do" });
        break;
      }
      case "don't": {
        ops.push({ code: "dont" });
        break;
      }
    }
  }
  return ops;
};

export const evaluate = (op: Op): number => {
  switch (op.code) {
    case "mul":
      return op.left * op.right;
    default:
      return 0;
  }
};

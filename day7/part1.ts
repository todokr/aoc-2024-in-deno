type Operator = "+" | "*" | "||";
const Operators: Operator[] = ["+", "*", "||"];
const opsCombi = (n: number, ops: Operator[] = Operators): Operator[][] =>
  ops.flatMap((op) => n === 1 ? [[op]] : opsCombi(n - 1, ops).map((ops) => [op, ...ops]));

const apply = (operands: number[], ops: Operator[]): number => {
  return ops.reduce((acc, op, i) => {
    const operand = operands[i + 1];
    switch (op) {
      case "+":
        return acc + operand;
      case "*":
        return acc * operand;
      case "||":
        return +`${acc}${operand}`;
    }
  }, operands[0]);
};

const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n").filter(Boolean);

let total = 0;
for (const line of lines) {
  const [answerPart, operandPart] = line.split(":").map((s) => s.trim());
  const answer = +(answerPart.trim());
  const operands = operandPart.split(" ").map((s) => +(s.trim()));
  const opsSet = opsCombi(operands.length - 1);
  for(const ops of opsSet) {
    const result = apply(operands, ops);
    if (result === answer) {
      total = total + answer;
      break;
    }
  }
}
console.log(total);

export type Machine = {
  a: {
    x: number;
    y: number;
  };
  b: {
    x: number;
    y: number;
  };
  prize: {
    x: number;
    y: number;
  };
}
export const load = (input: string): Machine[] => {
  const blocks = input.split('\n\n');
  return blocks.map(parseBlock);
}

const ButtonPattern = /Button [AB]: X\+(\d+), Y\+(\d+)/
const PrizePattern = /Prize: X=(\d+), Y=(\d+)/
export const parseBlock = (block: string): Machine => {
  const lines = block.split('\n');
  const aMatch = lines[0].match(ButtonPattern);
  const bMatch = lines[1].match(ButtonPattern);
  const prizeMatch = lines[2].match(PrizePattern);
  if (!aMatch || !bMatch || !prizeMatch) {
    console.log(block);
    console.log(aMatch);
    console.log(bMatch);
    console.log(prizeMatch);
    throw new Error('Invalid block');
  }

  return {
    a: {
      x: parseInt(aMatch[1], 10),
      y: parseInt(aMatch[2], 10),
    },
    b: {
      x: parseInt(bMatch[1], 10),
      y: parseInt(bMatch[2], 10),
    },
    prize: {
      x: parseInt(prizeMatch[1], 10),
      y: parseInt(prizeMatch[2], 10),
    }
  }
}

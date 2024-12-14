export type File = {
  id: number;
  index: number;
  size: number;
};
export type FreeSpace = {
  size: number;
};
export type Content = File | FreeSpace;
export const isFile = (x: Content): x is File =>
  (x as { id: number }).id !== undefined;
export const asArray = (contents: Content[]): string[] => {
  const output: string[] = [];
  for (const content of contents) {
    if (isFile(content)) {
      const id = `${content.id}`;
      output.push(...new Array(content.size).fill(id));
    } else {
      output.push(...new Array(content.size).fill("."));
    }
  }
  return output;
};

export const decode = (input: string): Content[] => {
  const tokens = input.split("");
  const initial: { content: Content[]; fileId: number } = {
    content: [],
    fileId: 0,
  };
  return tokens
    .reduce((acc, token, index) => {
      if (index % 2 === 0) { // file
        const file = { id: acc.fileId, index, size: +token };
        return {
          content: [...acc.content, file],
          fileId: acc.fileId + 1,
        };
      } else { // free space
        const space = { size: +token };
        return {
          content: [...acc.content, space],
          fileId: acc.fileId,
        };
      }
    }, initial).content;
};

export const defrag = (xs: string[]): string[] => {
  const result = [...xs];
  let finish = false;
  while (!finish) {
    const lastFile = result.findLastIndex((char) => char.match(/\w/));
    const firstSpace = result.findIndex((char) => char === ".");
    if (lastFile > firstSpace) {
      const file = result[lastFile];
      result[firstSpace] = file;
      result[lastFile] = ".";
    } else {
      finish = true;
    }
  }
  return result;
};

export const checksum = (input: string[]): number =>
  input.reduce((acc, token, index) => {
    if (token !== ".") {
      return acc + (+token * index);
    } else {
      return acc;
    }
  }, 0);

export const findSpace = (
  contents: Content[],
  size: number,
): { found: true; index: number; space: FreeSpace } | { found: false } => {
  const found = contents.findIndex((content) =>
    !isFile(content) && content.size >= size
  );
  if (found === -1) {
    return { found: false };
  } else {
    return { found: true, index: found, space: contents[found] as FreeSpace };
  }
};

export const place = (space: FreeSpace, file: File): Content[] => {
  const left = space.size - file.size;
  if (left < 0) {
    throw new Error("Not enough space");
  }
  return left > 0 ? [file, {size: left}] : [file]
};

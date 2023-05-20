export const getDecompressedLength = (input: string, recursive?: boolean) => {
  let length = 0;
  let index = 0;
  while (index < input.length) {
    if (input[index] !== '(') {
      index++;
      length++;
    } else {
      const endMarker = input.indexOf(')', index);
      const [repeatLength, repeatNum] = input
        .slice(index + 1, endMarker)
        .split('x');
      index = endMarker + +repeatLength + 1;
      if (recursive) {
        length +=
          +repeatNum *
          getDecompressedLength(
            input.slice(endMarker + 1, endMarker + 1 + +repeatLength),
            recursive,
          );
      } else {
        length += +repeatLength * +repeatNum;
      }
    }
  }
  return length;
};

export const day9 = (input: string) => {
  return getDecompressedLength(input);
};
export const day9part2 = (input: string) => {
  return getDecompressedLength(input, true);
};

export const decompressInput = (input: string): string => {
  let result = '';
  let index = 0;
  while (index < input.length) {
    if (input[index] !== '(') {
      result += input[index];
      index++;
    } else {
      const endMarker = input.slice(index).indexOf(')');
      const marker = input.slice(index + 1, index + endMarker);
      const [numChars, numRepeat] = marker.split('x');
      for (let i = 0; i < +numRepeat; i++) {
        result += input.substring(
          index + endMarker + 1,
          index + endMarker + 1 + +numChars,
        );
      }
      index += endMarker + 1 + +numChars;
    }
  }
  return result;
};

export const day9 = (input: string) => {
  const decompressed = decompressInput(input);
  return decompressed.length;
};
export const day9part2 = (input: string) => {
  return 9;
};

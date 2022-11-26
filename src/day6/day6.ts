const getCounts = (input: string[]) => {
  const counts: Record<number, Record<string, number>> = {};
  input.forEach((message) => {
    [...message].forEach((char, index) => {
      if (!counts[index]) counts[index] = {};
      if (counts[index][char]) counts[index][char] += 1;
      else counts[index][char] = 1;
    });
  });
  return counts;
};

export const day6 = (input: string[]) => {
  const counts = getCounts(input);
  const message = Object.values(counts)
    .map((posCount) => {
      let result = 'a';
      let max = 0;
      Object.keys(posCount).forEach((letter) => {
        if (posCount[letter] > max) {
          max = posCount[letter];
          result = letter;
        }
      });
      return result;
    })
    .join('');
  return message;
};

export const day6part2 = (input: string[]) => {
  const counts = getCounts(input);

  const message = Object.values(counts)
    .map((posCount) => {
      let result = 'a';
      let min = posCount['a'];
      Object.keys(posCount).forEach((letter) => {
        if (posCount[letter] < min) {
          min = posCount[letter];
          result = letter;
        }
      });
      return result;
    })
    .join('');
  return message;
};

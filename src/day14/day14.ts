import md5 from 'md5';
import { range } from '../utils/looping';

const memo: Record<string, string> = {};

const getHash = (salt: string, index: number, stretch: boolean) => {
  const key = `${salt}${index}${stretch}`;
  if (memo[key]) return memo[key];
  let hash = md5(`${salt}${index}`);
  if (stretch) {
    hash = range(2016).reduce((finalHash) => md5(finalHash), hash);
  }
  memo[key] = hash;
  return hash;
};

const getTriple = (
  salt: string,
  index: number,
  stretch: boolean,
): string | undefined => {
  const hash = getHash(salt, index, stretch);
  return [...hash].find(
    (char, index) => char === hash[index + 1] && char === hash[index + 2],
  );
};

const getHasQuintupleInNextThousand = (
  salt: string,
  index: number,
  repeat: string,
  stretch: boolean,
): boolean =>
  range(index + 1, index + 1001).some((nextIndex) => {
    const hash = getHash(salt, nextIndex, stretch);
    return hash.includes(`${repeat}${repeat}${repeat}${repeat}${repeat}`);
  });

const getIsKey = (salt: string, index: number, stretch: boolean): boolean => {
  const repeat = getTriple(salt, index, stretch);
  if (!repeat) return false;
  return getHasQuintupleInNextThousand(salt, index, repeat, stretch);
};

const getIndexForNthKey = (salt: string, n: number, stretch: boolean) => {
  let index = 0;
  let numKeys = 0;
  while (numKeys < n) {
    if (getIsKey(salt, index, stretch)) {
      numKeys++;
    }
    index++;
  }
  return index - 1;
};

export const day14 = (salt: string) => getIndexForNthKey(salt, 64, false);

export const day14part2 = (salt: string) => getIndexForNthKey(salt, 64, true);

import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day7, day7part2 } from './day7';
import { data } from './day7.data';

const testString = `abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`;
const testData = parseInput(testString);
const testString2 = `aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb`;
const testData2 = parseInput(testString2);

describe('day 7', () => {
  it('test cases', () => {
    expect(day7(testData)).toBe(2);
  });

  it('answer', () => {
    const answer = day7(data);
    logAnswer(answer, 7, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(115);
  });
});

describe('day 7 part 2', () => {
  it('test cases', () => {
    expect(day7part2(testData2)).toBe(3);
  });

  it('answer', () => {
    const answer = day7part2(data);
    logAnswer(answer, 7, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(231);
  });
});

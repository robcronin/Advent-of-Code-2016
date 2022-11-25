import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day2, day2part2 } from './day2';
import { data } from './day2.data';

const testString = `ULL
RRDDD
LURDL
UUUUD`;
const testData = parseInput(testString);

describe('day 2', () => {
  it('test cases', () => {
    expect(day2(testData)).toBe(1985);
  });

  it('answer', () => {
    const answer = day2(data);
    logAnswer(answer, 2, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(48584);
  });
});

describe('day 2 part 2', () => {
  it('test cases', () => {
    expect(day2part2(testData)).toBe('5db3');
  });

  it('answer', () => {
    const answer = day2part2(data);
    logAnswer(answer, 2, 2);
    expect(typeof answer).toBe('string');
    expect(answer).toBe('563b6');
  });
});

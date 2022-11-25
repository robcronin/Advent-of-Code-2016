import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day1, day1part2 } from './day1';
import { data } from './day1.data';

const testString = 'R5, L5, R5, R3';
const testString2 = 'R8, R4, R4, R8'
const testData = parseInput(testString);
const testData2 = parseInput(testString2);

describe('day 1', () => {
  it('test cases', () => {
    expect(day1(testData)).toBe(12);
  });

  it('answer', () => {
    const answer = day1(data);
    logAnswer(answer, 1, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(243);
  });
});

describe('day 1 part 2', () => {
  it('test cases', () => {
    expect(day1part2(testData2)).toBe(4);
  });

  it('answer', () => {
    const answer = day1part2(data);
    logAnswer(answer, 1, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(142);
  });
});

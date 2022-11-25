import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day3, day3part2 } from './day3';
import { data } from './day3.data';

const testString = `  330  143  338
  769  547   83
  930  625  317
  669  866  147
  10  20  11
  15  881  210`;
const testData = parseInput(testString);

describe('day 3', () => {
  it('test cases', () => {
    expect(day3(testData)).toBe(3);
  });

  it('answer', () => {
    const answer = day3(data);
    logAnswer(answer, 3, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(917);
  });
});

describe('day 3 part 2', () => {
  it('test cases', () => {
    expect(day3part2(testData)).toBe(4);
  });

  it('answer', () => {
    const answer = day3part2(data);
    logAnswer(answer, 3, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1649);
  });
});

import { logAnswer } from '../utils/logging';
import { day11 } from './day11';
import { data, data2, testData } from './day11.data';

describe('day 11', () => {
  it('test cases', () => {
    expect(day11(testData)).toBe(11);
  });

  it('answer', () => {
    const answer = day11(data);
    logAnswer(answer, 11, 1);
    expect(answer).toBe(47);
  });
});

describe('day 11 part 2', () => {
  it('answer', () => {
    const answer = day11(data2);
    logAnswer(answer, 11, 2);
    expect(answer).toBe(71);
  });
});

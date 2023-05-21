import { logAnswer } from '../utils/logging';
import { day13, day13part2 } from './day13';
import { data, testData } from './day13.data';

describe('day 13', () => {
  it('test cases', () => {
    expect(day13(testData, { x: 7, y: 4 })).toBe(11);
  });

  it('answer', () => {
    const answer = day13(data, { x: 31, y: 39 });
    logAnswer(answer, 13, 1);
    expect(answer).toBe(86);
  });
});

describe('day 13 part 2', () => {
  it('answer', () => {
    const answer = day13part2(data);
    logAnswer(answer, 13, 2);
    expect(answer).toBe(127);
  });
});

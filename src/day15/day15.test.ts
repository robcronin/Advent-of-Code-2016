import { logAnswer } from '../utils/logging';
import { day15, day15part2 } from './day15';
import { data, testData } from './day15.data';

describe('day 15', () => {
  it('test cases', () => {
    expect(day15(testData)).toBe(5);
  });

  it('answer', () => {
    const answer = day15(data);
    logAnswer(answer, 15, 1);
    expect(answer).toBe(400589);
  });
});

describe('day 15 part 2', () => {
  it('answer', () => {
    const answer = day15part2(data);
    logAnswer(answer, 15, 2);
    expect(answer).toBe(3045959);
  });
});

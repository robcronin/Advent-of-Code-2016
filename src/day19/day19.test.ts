import { logAnswer } from '../utils/logging';
import { day19, day19part2 } from './day19';
import { data, testData } from './day19.data';

describe('day 19', () => {
  it('test cases', () => {
    expect(day19(testData)).toBe(3);
  });

  it('answer', () => {
    const answer = day19(data);
    logAnswer(answer, 19, 1);
    expect(answer).toBe(1842613);
  });
});

describe('day 19 part 2', () => {
  it('test cases', () => {
    expect(day19part2(testData)).toBe(2);
  });
  it('test cases 2', () => {
    expect(day19part2(27)).toBe(27);
    expect(day19part2(28)).toBe(1);
  });

  it('answer', () => {
    const answer = day19part2(data);
    logAnswer(answer, 19, 2);
    expect(answer).toBe(1424135);
  });
});

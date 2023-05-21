import { logAnswer } from '../utils/logging';
import { day16 } from './day16';
import { data, testData } from './day16.data';

describe('day 16', () => {
  it('test cases', () => {
    expect(day16(testData, 20)).toBe('01100');
  });

  it('answer', () => {
    const answer = day16(data, 272);
    logAnswer(answer, 16, 1);
    expect(answer).toBe('11101010111100010');
  });
});

describe('day 16 part 2', () => {
  it('answer', () => {
    const answer = day16(data, 35651584);
    logAnswer(answer, 16, 2);
    expect(answer).toBe('01001101001000101');
  });
});

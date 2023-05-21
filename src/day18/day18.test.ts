import { logAnswer } from '../utils/logging';
import { day18 } from './day18';
import { data, testData } from './day18.data';

describe('day 18', () => {
  it('test cases', () => {
    expect(day18(testData, 10)).toBe(38);
  });

  it('answer', () => {
    const answer = day18(data, 40);
    logAnswer(answer, 18, 1);
    expect(answer).toBe(1939);
  });
});

describe('day 18 part 2', () => {
  it('answer', () => {
    const answer = day18(data, 400000);
    logAnswer(answer, 18, 2);
    expect(answer).toBe(19999535);
  });
});

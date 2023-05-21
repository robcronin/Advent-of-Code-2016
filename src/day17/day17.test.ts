import { logAnswer } from '../utils/logging';
import { day17, day17part2 } from './day17';
import { data, testData } from './day17.data';

describe('day 17', () => {
  it('test cases', () => {
    expect(day17(testData)).toBe('DDRRRD');
  });

  it('answer', () => {
    const answer = day17(data);
    logAnswer(answer, 17, 1);
    expect(answer).toBe('DDRUDLRRRD');
  });
});

describe('day 17 part 2', () => {
  it('answer', () => {
    const answer = day17part2(data);
    logAnswer(answer, 17, 2);
    expect(answer).toBe(398);
  });
});

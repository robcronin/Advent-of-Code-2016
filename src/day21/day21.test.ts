import { logAnswer } from '../utils/logging';
import { day21, day21part2 } from './day21';
import { data, testData } from './day21.data';

describe('day 21', () => {
  it('test cases', () => {
    expect(day21(testData, 'abcde')).toBe('decab');
  });

  it('answer', () => {
    const answer = day21(data, 'abcdefgh');
    logAnswer(answer, 21, 1);
    expect(answer).toBe('gfdhebac');
  });
});

describe('day 21 part 2', () => {
  it('test cases', () => {
    expect(day21part2(testData, 'decab')).toBe('deabc');
  });

  it('answer', () => {
    const answer = day21part2(data, 'fbgdceah');
    logAnswer(answer, 21, 2);
    expect(answer).toBe('dhaegfbc');
  });
});

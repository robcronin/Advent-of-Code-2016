import { logAnswer } from '../utils/logging';
import { day9, day9part2, decompressInput } from './day9';
import { data } from './day9.data';

describe('day 9', () => {
  it('test cases', () => {
    expect(decompressInput('ADVENT')).toBe('ADVENT');
    expect(decompressInput('A(1x5)BC')).toBe('ABBBBBC');
    expect(decompressInput('(3x3)XYZ')).toBe('XYZXYZXYZ');
    expect(decompressInput('A(2x2)BCD(2x2)EFG')).toBe('ABCBCDEFEFG');
    expect(decompressInput('(6x1)(1x3)A')).toBe('(1x3)A');
    expect(decompressInput('X(8x2)(3x3)ABCY')).toBe('X(3x3)ABC(3x3)ABCY');
  });

  it('answer', () => {
    const answer = day9(data);
    logAnswer(answer, 9, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(183269);
  });
});

describe('day 9 part 2', () => {
  it('test cases', () => {
    expect(day9part2(testData)).toBe(9);
  });

  it('answer', () => {
    const answer = day9part2(data);
    logAnswer(answer, 9, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(9);
  });
});

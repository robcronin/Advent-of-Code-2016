import { logAnswer } from '../utils/logging';
import { day9, day9part2, getDecompressedLength } from './day9';
import { data } from './day9.data';

describe('day 9', () => {
  it('test cases', () => {
    expect(getDecompressedLength('ADVENT')).toBe('ADVENT'.length);
    expect(getDecompressedLength('A(1x5)BC')).toBe('ABBBBBC'.length);
    expect(getDecompressedLength('(3x3)XYZ')).toBe('XYZXYZXYZ'.length);
    expect(getDecompressedLength('A(2x2)BCD(2x2)EFG')).toBe(
      'ABCBCDEFEFG'.length,
    );
    expect(getDecompressedLength('(6x1)(1x3)A')).toBe('(1x3)A'.length);
    expect(getDecompressedLength('X(8x2)(3x3)ABCY')).toBe(
      'X(3x3)ABC(3x3)ABCY'.length,
    );
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
    expect(getDecompressedLength('(3x3)XYZ', true)).toBe('XYZXYZXYZ'.length);
    expect(getDecompressedLength('X(8x2)(3x3)ABCY', true)).toBe(
      'XABCABCABCABCABCABCY'.length,
    );
    expect(
      getDecompressedLength('(27x12)(20x12)(13x14)(7x10)(1x12)A', true),
    ).toBe(241920);
    expect(
      getDecompressedLength(
        '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN',
        true,
      ),
    ).toBe(445);
  });

  it('answer', () => {
    const answer = day9part2(data);
    logAnswer(answer, 9, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(11317278863);
  });
});

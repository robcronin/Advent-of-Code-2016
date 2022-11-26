import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day8, day8part2 } from './day8';
import { data } from './day8.data';

const testString = `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`;
const testData = parseInput(testString);

describe('day 8', () => {
  it('test cases', () => {
    expect(day8(testData)).toBe(6);
  });

  it('answer', () => {
    const answer = day8(data);
    logAnswer(answer, 8, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(110);
  });
});

describe('day 8 part 2', () => {
  it('test cases', () => {
    expect(day8part2(testData))
      .toBe(`. . . . # . # . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
# . # . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. # . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. # . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
`);
  });

  it('answer', () => {
    const answer = day8part2(data);
    logAnswer(answer, 8, 2);
    expect(typeof answer).toBe('string');
    expect(answer)
      .toBe(`# # # # . . . # # . # . . # . # # # . . # . . # . . # # . . # # # . . # . . . . # . . . # . . # # .
. . . # . . . . # . # . . # . # . . # . # . # . . # . . # . # . . # . # . . . . # . . . # . . . # .
. . # . . . . . # . # # # # . # . . # . # # . . . # . . . . # . . # . # . . . . . # . # . . . . # .
. # . . . . . . # . # . . # . # # # . . # . # . . # . . . . # # # . . # . . . . . . # . . . . . # .
# . . . . # . . # . # . . # . # . # . . # . # . . # . . # . # . . . . # . . . . . . # . . # . . # .
# # # # . . # # . . # . . # . # . . # . # . . # . . # # . . # . . . . # # # # . . . # . . . # # . .
`);
  });
});

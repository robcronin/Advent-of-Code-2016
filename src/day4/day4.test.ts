import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day4, day4part2 } from './day4';
import { data } from './day4.data';

const testString = `aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`;

const testData = parseInput(testString);

describe('day 4', () => {
  it('test cases', () => {
    expect(day4(testData)).toBe(1514);
  });

  it('answer', () => {
    const answer = day4(data);
    logAnswer(answer, 4, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(278221);
  });
});

describe('day 4 part 2', () => {
  it('answer', () => {
    const answer = day4part2(data);
    logAnswer(answer, 4, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(267);
  });
});

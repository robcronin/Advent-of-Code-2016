import { logAnswer } from '../utils/logging';
import { day5, day5part2 } from './day5';

const testData = 'abc';
const data = 'uqwqemis';

describe.skip('day 5', () => {
  it('test cases', () => {
    console.log(testData);
    expect(day5(testData)).toBe('18f47a30');
  });

  it('answer', () => {
    const answer = day5(data);
    logAnswer(answer, 5, 1);
    expect(typeof answer).toBe('string');
    expect(answer).toBe('1a3099aa');
  });
});

describe.skip('day 5 part 2', () => {
  it('test cases', () => {
    expect(day5part2(testData)).toBe('05ace8e3');
  });

  it('answer', () => {
    const answer = day5part2(data);
    logAnswer(answer, 5, 2);
    expect(typeof answer).toBe('string');
    expect(answer).toBe('694190cd');
  });
});

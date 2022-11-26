import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day6, day6part2 } from './day6';
import { data } from './day6.data';

const testString = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`;
const testData = parseInput(testString);

describe('day 6', () => {
  it('test cases', () => {
    expect(day6(testData)).toBe('easter');
  });

  it('answer', () => {
    const answer = day6(data);
    logAnswer(answer, 6, 1);
    expect(typeof answer).toBe('string');
    expect(answer).toBe('bjosfbce');
  });
});

describe('day 6 part 2', () => {
  it('test cases', () => {
    expect(day6part2(testData)).toBe('advent');
  });

  it('answer', () => {
    const answer = day6part2(data);
    logAnswer(answer, 6, 2);
    expect(typeof answer).toBe('string');
    expect(answer).toBe('veqfxzfx');
  });
});

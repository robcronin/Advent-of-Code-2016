import { range } from '../utils/looping';

/*
  If power of 2 people, then starter survives
  Need to remove x=n - floor(log_2(n)) people to get power of 2
  2*x + 1 then has sword when power of 2 left
*/
export const day19 = (input: number) => {
  const closestPower = 2 ** Math.floor(Math.log2(input));
  const numToSteal = input - closestPower;
  return numToSteal * 2 + 1;
};

/*
  Pattern increases by 1 for each person
    until the expected winner is strictly in the second half
      At which point it increases by 2 people each time
        until the winner is the last person
          at which point person 1 wins again
*/
export const day19part2 = (input: number) =>
  range(2, input + 1).reduce((ans, num) => {
    const current = (ans % (num - 1)) + 1;
    if (2 * current > num) return current + 1;
    return current;
  }, 1);

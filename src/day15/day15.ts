/*
  Could use CRT here but runs super quick already - even without the offset skip
*/

import { maxArr } from '../utils/array';

type Disc = {
  disc: number;
  numPositions: number;
  currentPosition: number;
};

const parseDiscs = (input: string[]): Disc[] =>
  input.map((line) => {
    const groups = line.match(
      new RegExp(
        'Disc #([0-9]+) has ([0-9]+) positions; at time=0, it is at position ([0-9]+).',
      ),
    );
    if (!groups) throw new Error(`Incorrect format: ${line}`);
    const [_, disc, numPositions, currentPosition] = groups;
    return {
      disc: +disc,
      numPositions: +numPositions,
      currentPosition: +currentPosition,
    };
  });

const isOnSlot = (discs: Disc[]) =>
  discs.every(
    (disc) => (disc.currentPosition + disc.disc) % disc.numPositions === 0,
  );

const bumpDiscsByTime = (discs: Disc[], bump: number) =>
  discs.forEach(
    (disc) =>
      (disc.currentPosition =
        (disc.currentPosition + bump) % disc.numPositions),
  );

const getMaxDiscOffset = (discs: Disc[]) => {
  const maxNumPositions = maxArr(discs, (disc) => disc.numPositions);
  const maxDisc = discs.find(
    (disc) => disc.numPositions === maxNumPositions,
  ) as Disc;
  const maxPosAtTime =
    (maxDisc.currentPosition + maxDisc.disc) % maxDisc.numPositions;
  const offset = maxPosAtTime === 0 ? 0 : maxDisc.numPositions - maxPosAtTime;
  return { offset, increment: maxDisc.numPositions };
};

const findTimeOnSlot = (discs: Disc[]): number => {
  const { offset, increment } = getMaxDiscOffset(discs);
  let time = offset;
  bumpDiscsByTime(discs, offset);

  while (!isOnSlot(discs)) {
    bumpDiscsByTime(discs, increment);
    time += increment;
  }
  return time;
};

export const day15 = (input: string[]) => {
  const discs = parseDiscs(input);
  return findTimeOnSlot(discs);
};

export const day15part2 = (input: string[]) => {
  const discs = parseDiscs(input);
  discs.push({ disc: 7, numPositions: 11, currentPosition: 0 });
  return findTimeOnSlot(discs);
};

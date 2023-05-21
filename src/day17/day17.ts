import md5 from 'md5';
import { Coords } from '../utils/grid';

type State = {
  path: string;
  location: Coords;
};

export const directions: [number, number, string][] = [
  [-1, 0, 'U'],
  [1, 0, 'D'],
  [0, -1, 'L'],
  [0, 1, 'R'],
];

const getNeighbours = (
  state: State,
  passcode: string,
): (Coords & { dir: string })[] => {
  const { location, path } = state;
  const { x, y } = location;
  const hash = md5(`${passcode}${path}`);
  const openCode = ['b', 'c', 'd', 'e', 'f'];
  return directions
    .filter((_, index) => openCode.includes(hash[index]))
    .map(([dx, dy, dir]) => ({ x: x + dx, y: y + dy, dir }))
    .filter(({ x, y }) => x >= 0 && x < 4 && y >= 0 && y < 4);
};

const getNewStates = (states: State[], passcode: string) => {
  const newStates: State[] = [];
  states.forEach((state) => {
    const neighbours = getNeighbours(state, passcode);
    neighbours.forEach((neighbour) => {
      newStates.push({
        location: { x: neighbour.x, y: neighbour.y },
        path: state.path + neighbour.dir,
      });
    });
  });
  return newStates;
};

const getAtVault = (states: State[], vault: Coords) =>
  states.find(
    ({ location }) => location.x === vault.x && location.y === vault.y,
  );

const bfsGetPathToVault = (
  states: State[],
  passcode: string,
  vault: Coords,
): string => {
  const atVault = getAtVault(states, vault);
  if (atVault) return atVault.path;
  const newStates = getNewStates(states, passcode);

  return bfsGetPathToVault(newStates, passcode, vault);
};

const bfsGetLongestToVault = (
  states: State[],
  passcode: string,
  vault: Coords,
  longestPath: number,
): number => {
  if (states.length === 0) return longestPath;

  const newStates = getNewStates(states, passcode);
  const atVault = getAtVault(newStates, vault);
  const newLongest = Math.max(atVault?.path.length || 0, longestPath);

  const nonEndStates = newStates.filter(
    ({ location }) => !(location.x === vault.x && location.y === vault.y),
  );
  return bfsGetLongestToVault(nonEndStates, passcode, vault, newLongest);
};

export const day17 = (passcode: string) =>
  bfsGetPathToVault([{ location: { x: 0, y: 0 }, path: '' }], passcode, {
    x: 3,
    y: 3,
  });

export const day17part2 = (passcode: string) => {
  return bfsGetLongestToVault(
    [{ location: { x: 0, y: 0 }, path: '' }],
    passcode,
    {
      x: 3,
      y: 3,
    },
    0,
  );
};

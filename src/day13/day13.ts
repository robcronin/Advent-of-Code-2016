import { sumArr } from '../utils/array';
import { Coords, directions } from '../utils/grid';

const getGetIsGridOpen = (favNumber: number) => (coords: Coords) => {
  const { x, y } = coords;
  const decimal = x * x + 3 * x + 2 * x * y + y + y * y + favNumber;
  const binary = decimal.toString(2);
  const sumBits = sumArr([...binary], (i) => +i);
  return sumBits % 2 === 0;
};

const getNeighbours = (coords: Coords, favNumber: number): Coords[] => {
  const { x, y } = coords;
  const getIsGridOpen = getGetIsGridOpen(favNumber);
  return directions
    .map(([dx, dy]) => ({ x: x + dx, y: y + dy }))
    .filter(({ x, y }) => x >= 0 && y >= 0)
    .filter(getIsGridOpen);
};

const bfsSearch = (
  currentSteps: number,
  visited: Set<string>,
  locations: Coords[],
  favNumber: number,
  stopCondition: (coords: Coords, steps: number) => boolean,
): number => {
  if (locations.find((location) => stopCondition(location, currentSteps)))
    return currentSteps;

  const nextLocations: Coords[] = [];
  locations.forEach((location) => {
    const neighbours = getNeighbours(location, favNumber);
    neighbours.forEach((neighbour) => {
      const key = `${neighbour.x},${neighbour.y}`;
      if (!visited.has(key)) {
        nextLocations.push(neighbour);
        visited.add(key);
      }
    });
  });

  return bfsSearch(
    currentSteps + 1,
    visited,
    nextLocations,
    favNumber,
    stopCondition,
  );
};

const getMinSteps = (favNumber: number, target: Coords) =>
  bfsSearch(
    0,
    new Set<string>(),
    [{ x: 1, y: 1 }],
    favNumber,
    ({ x, y }) => x === target.x && y === target.y,
  );

const getLocationsVisited = (favNumber: number, numSteps: number) => {
  const visited = new Set<string>();
  visited.add('1,1');
  bfsSearch(
    0,
    visited,
    [{ x: 1, y: 1 }],
    favNumber,
    (_, steps) => steps === numSteps,
  );
  return visited.size;
};

export const day13 = (input: number, target: Coords) => {
  return getMinSteps(input, target);
};
export const day13part2 = (input: number) => {
  return getLocationsVisited(input, 50);
};

import { maxArr } from '../utils/array';
import { getUniqueOns } from '../utils/permute';

type Floor = {
  chips: string[];
  generators: string[];
};
type FloorMap = { floors: Floor[]; elevator: number };
type Perms = Record<string, number[][]>;

const parseFloorMap = (input: string[]): FloorMap => {
  const floors = input.map((line) =>
    line
      .split(' ')
      .reverse()
      .reduce(
        (floor: Floor, word, index, words) => {
          if (word.includes('generator')) {
            return {
              ...floor,
              generators: [...floor.generators, words[index + 1]],
            };
          } else if (word.includes('microchip')) {
            const chip = words[index + 1].split('-')[0];
            return { ...floor, chips: [...floor.chips, chip] };
          }
          return floor;
        },
        { chips: [], generators: [] },
      ),
  );
  return { floors, elevator: 0 };
};

const isEndState = (floorMap: FloorMap): boolean =>
  floorMap.floors
    .slice(0, floorMap.floors.length - 1)
    .every(
      ({ chips, generators }) => chips.length === 0 && generators.length === 0,
    );

const isLegalState = (floorMap: FloorMap): boolean =>
  floorMap.floors.every(
    ({ chips, generators }) =>
      generators.length === 0 ||
      chips.every((chip) => generators.includes(chip)),
  );

const deepCopyFloorMap = (floorMap: FloorMap): FloorMap => {
  const newFloors = floorMap.floors.map((floor) => ({
    chips: [...floor.chips],
    generators: [...floor.generators],
  }));
  return { floors: newFloors, elevator: floorMap.elevator };
};

const getStateKey = (floorMap: FloorMap): string =>
  floorMap.floors
    .map((floor, index) => {
      const chipString = floor.chips
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, chip) => acc + chip, '');
      const generatorString = floor.generators
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, chip) => `${acc}${chip}/`, '');
      return `${index}-${chipString}-${generatorString};`;
    })
    .reduce((acc, floorString) => acc + floorString, `e-${floorMap.elevator};`);

const getNumOnTopFloor = (floorMap: FloorMap): number => {
  const topFloor = floorMap.floors[floorMap.floors.length - 1];
  return topFloor.chips.length + topFloor.generators.length;
};

const getPerm = (length: number, numOn: number, perms: Perms) => {
  const permKey = `${length}:${numOn}`;

  if (!perms[permKey]) {
    const perm = getUniqueOns(length, numOn);
    perms[permKey] = perm;
    return perm;
  } else {
    return perms[permKey];
  }
};

const getPossibleMovers = (floorMap: FloorMap, perms: Perms) => {
  const topFloor = floorMap.floors.length - 1;
  const elevator = floorMap.elevator;

  const thisFloor = floorMap.floors[elevator];
  const doublePair = thisFloor.chips
    .filter((chip) => thisFloor.generators.includes(chip))
    .slice(1);
  const onThisFloor = [
    ...thisFloor.chips
      .filter((chip) => !doublePair?.includes(chip))
      .map((chip) => `c-${chip}`),
    ...thisFloor.generators
      .filter((generator) => !doublePair?.includes(generator))
      .map((generator) => `g-${generator}`),
  ];
  if (onThisFloor.length === 0)
    throw new Error('Invalid State: nothing on floor');

  const oneMoves = getPerm(onThisFloor.length, 1, perms);
  const twoMoves =
    onThisFloor.length > 1 && elevator !== topFloor
      ? getPerm(onThisFloor.length, 2, perms)
      : [];
  const possibleMoves = [...oneMoves, ...twoMoves];
  return possibleMoves.map((move) =>
    move
      .map((isOn, index) => (isOn === 1 ? onThisFloor[index] : ''))
      .filter((item) => item !== ''),
  );
};

const getPrunedNextMaps = (nextStepMaps: FloorMap[]) => {
  const maxOnTopFloor = maxArr(nextStepMaps, getNumOnTopFloor);
  const limit = Math.max(maxOnTopFloor - 2, 0);
  return nextStepMaps.filter((map) => getNumOnTopFloor(map) >= limit);
};

const bfsGetMinStepsToEnd = (
  floorMaps: FloorMap[],
  steps: number,
  oldStates: Set<string>,
  perms: Record<string, number[][]>,
): number => {
  if (floorMaps.some((floorMap) => isEndState(floorMap))) return steps;
  const nextStepMaps: FloorMap[] = [];

  floorMaps.forEach((floorMap) => {
    const elevator = floorMap.elevator;
    const possibleMovers = getPossibleMovers(floorMap, perms);

    possibleMovers.forEach((movers) => {
      const newFloorMap = deepCopyFloorMap(floorMap);

      // Remove mover from this floor
      movers.forEach((mover) => {
        const [typeKey, name] = mover.split('-');
        const type = typeKey === 'c' ? 'chips' : 'generators';
        newFloorMap.floors[elevator][type] = newFloorMap.floors[elevator][
          type
        ].filter((chip) => chip !== name);
      });

      const elevatorMoves = [elevator - 1, elevator + 1].filter(
        (level) => level >= 0 && level < floorMap.floors.length,
      );
      elevatorMoves.forEach((newLevel) => {
        const newInnerFloorMap = deepCopyFloorMap(newFloorMap);
        newInnerFloorMap.elevator = newLevel;
        // Add mover to new floor
        movers.forEach((mover) => {
          const [typeKey, name] = mover.split('-');
          const type = typeKey === 'c' ? 'chips' : 'generators';
          newInnerFloorMap.floors[newLevel][type].push(name);
        });
        if (isLegalState(newInnerFloorMap)) {
          const key = getStateKey(newInnerFloorMap);
          if (!oldStates.has(key)) {
            oldStates.add(key);
            nextStepMaps.push(newInnerFloorMap);
          }
        }
      });
    });
  });

  const prunedMaps = getPrunedNextMaps(nextStepMaps);
  return bfsGetMinStepsToEnd(prunedMaps, steps + 1, oldStates, perms);
};

export const day11 = (input: string[]) => {
  const floorMap = parseFloorMap(input);
  return bfsGetMinStepsToEnd([floorMap], 0, new Set<string>(), {});
};

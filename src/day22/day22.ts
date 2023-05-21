import { maxArr } from '../utils/array';
import { Coords, Grid } from '../utils/grid';
import { range } from '../utils/looping';

type GridValue = { used: number; avail: number };
type NodeInfo = { grid: Grid<GridValue>; numRows: number; numCols: number };
type Pair = { a: Coords; b: Coords };
type State = { nodeInfo: NodeInfo; targetData: Coords };

type Global = { minFound: number };
type StateD = { nodeInfo: NodeInfo; targetData: Coords; steps: number };

const parseNodes = (input: string[]): NodeInfo => {
  const parsed = input.slice(2).map((line) => {
    const [nodeString, size, used, avail] = line.split(/\s+/);
    const groups = nodeString.match(
      new RegExp('/dev/grid/node-x([0-9]+)-y([0-9]+)'),
    );
    if (!groups) throw new Error(`Incorrect input: ${line}`);
    const [_, x, y] = groups;
    return {
      x: +x,
      y: +y,
      used: +used.slice(0, -1),
      avail: +avail.slice(0, -1),
    };
  });
  const numRows = maxArr(parsed, (i) => i.x) + 1;
  const numCols = maxArr(parsed, (i) => i.y) + 1;
  const grid = new Grid(numRows, numCols, { used: 0, avail: 0 });
  parsed.forEach((parse) => {
    grid.set(
      { x: parse.x, y: parse.y },
      { used: parse.used, avail: parse.avail },
    );
  });
  return { grid, numRows, numCols };
};

const getMovablePairs = (nodeInfo: NodeInfo): Pair[] => {
  const { grid, numRows, numCols } = nodeInfo;
  const pairs: Pair[] = [];
  range(numRows).forEach((x) => {
    range(numCols).forEach((y) => {
      const usedA = grid.get({ x, y }).used;
      if (usedA > 0) {
        grid.getNeighbours({ x, y }).forEach((n) => {
          const availB = grid.get(n).avail;
          if (availB >= usedA) pairs.push({ a: { x, y }, b: n });
        });
      }
    });
  });
  return pairs;
};
const getViablePairs = (nodeInfo: NodeInfo): Pair[] => {
  const { grid, numRows, numCols } = nodeInfo;
  const pairs: Pair[] = [];
  range(numRows).forEach((ax) => {
    range(numCols).forEach((ay) => {
      const a = { x: ax, y: ay };
      const usedA = grid.get(a).used;
      if (usedA > 0) {
        range(numRows).forEach((bx) => {
          range(numCols).forEach((by) => {
            const b = { x: bx, y: by };
            const availB = grid.get(b).avail;
            if (availB >= usedA) pairs.push({ a, b });
          });
        });
      }
    });
  });
  return pairs;
};

const bfsMoveData = (states: State[], steps: number): number => {
  console.log(steps, ':', states.length);
  if (
    states.find((state) => state.targetData.x === 0 && state.targetData.y === 0)
  )
    return steps;

  const newStates: State[] = [];
  states.forEach((state) => {
    const pairs = getMovablePairs(state.nodeInfo);
    pairs.forEach(({ a, b }) => {
      const newGrid = state.nodeInfo.grid.createDeepCopy();
      const oldA = state.nodeInfo.grid.get(a);
      const oldB = state.nodeInfo.grid.get(b);
      newGrid.set(a, { used: 0, avail: oldA.avail + oldA.used });
      newGrid.set(b, {
        used: oldB.used + oldA.used,
        avail: oldB.avail - oldA.used,
      });
      const targetData =
        state.targetData.x === a.x && state.targetData.y === a.y
          ? b
          : state.targetData;
      newStates.push({
        nodeInfo: { ...state.nodeInfo, grid: newGrid },
        targetData,
      });
    });
  });

  return bfsMoveData(newStates, steps + 1);
};

const dfsMoveData = (state: StateD, global: Global): void => {
  // console.log(state.steps);
  if (state.steps + state.targetData.x + state.targetData.y >= global.minFound)
    return;
  if (state.targetData.x === 0 && state.targetData.y === 0) {
    global.minFound = Math.min(state.steps, global.minFound);
    if (global.minFound === state.steps) console.log('New min', state.steps);
    return;
    // return global.minFound;
  }
  const pairs = getMovablePairs(state.nodeInfo);
  pairs.forEach(({ a, b }) => {
    const newGrid = state.nodeInfo.grid.createDeepCopy();
    const oldA = state.nodeInfo.grid.get(a);
    const oldB = state.nodeInfo.grid.get(b);
    newGrid.set(a, { used: 0, avail: oldA.avail + oldA.used });
    newGrid.set(b, {
      used: oldB.used + oldA.used,
      avail: oldB.avail - oldA.used,
    });
    const targetData =
      state.targetData.x === a.x && state.targetData.y === a.y
        ? b
        : state.targetData;
    const newState: StateD = {
      nodeInfo: { ...state.nodeInfo, grid: newGrid },
      targetData,
      steps: state.steps + 1,
    };
    return dfsMoveData(newState, global);
  });
};

const getMinStepsToMove = (nodeInfo: NodeInfo): number =>
  bfsMoveData([{ nodeInfo, targetData: { x: nodeInfo.numRows - 1, y: 0 } }], 0);

const getMinStepsToMove2 = (nodeInfo: NodeInfo): number => {
  const global = { minFound: 1000 };
  dfsMoveData(
    { nodeInfo, targetData: { x: nodeInfo.numRows - 1, y: 0 }, steps: 0 },
    global,
  );
  return global.minFound;
};

export const day22 = (input: string[]) => {
  const nodeInfo = parseNodes(input);
  const pairs = getViablePairs(nodeInfo);
  return pairs.length;
};

export const day22part2 = (input: string[]) => {
  const nodeInfo = parseNodes(input);
  return getMinStepsToMove2(nodeInfo);
};

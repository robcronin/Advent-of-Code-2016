import {
  countValueInGrid,
  genNewGrid,
  GridInfo,
  printGrid,
  runFnOnGrid,
} from '../utils/grid';

type Instruction = {
  isRect: boolean;
  width: number;
  height: number;
  isRotate: boolean;
  type: 'row' | 'column';
  index: number;
  shift: number;
};

const parseInstruction = (instruction: string): Instruction => {
  const groups = instruction.match(
    new RegExp(
      '^(rect ([0-9]+)x([0-9]+))|(rotate (column|row) (x|y)=([0-9]+) by ([0-9]+))$',
    ),
  );
  if (!groups) throw new Error(`Instruction ${instruction} is not valid`);
  const [_, isRect, width, height, isRotate, type, _a, index, shift] = groups;
  return {
    isRect: !!isRect,
    width: +width,
    height: +height,
    isRotate: !!isRotate,
    type: type as 'row' | 'column',
    index: +index,
    shift: +shift,
  };
};

const runInstruction = (
  gridInfo: GridInfo<string>,
  instruction: Instruction,
) => {
  const { numRows, numCols } = gridInfo;
  const { isRect, width, height, isRotate, type, index, shift } = instruction;
  if (isRect) {
    return runFnOnGrid({
      gridInfo,
      fnToRun: ({ coords: { x, y }, value }) => {
        if (x < height && y < width) return '#';
        return value;
      },
    });
  } else if (isRotate && type === 'row') {
    return runFnOnGrid({
      gridInfo,
      fnToRun: ({ coords: { x, y }, value, grid }) => {
        if (x === index) return grid[x][(y - shift + numCols) % numCols];
        return value;
      },
    });
  } else if (isRotate && type === 'column') {
    return runFnOnGrid({
      gridInfo,
      fnToRun: ({ coords: { x, y }, value, grid }) => {
        if (y === index) return grid[(x - shift + numRows) % numRows][y];
        return value;
      },
    });
  }
  return gridInfo;
};

const runAllInstructions = (input: string[]) => {
  const initialGridInfo = genNewGrid({
    numRows: 6,
    numCols: 50,
    defaultValue: '.',
  });
  const instructions = input.map(parseInstruction);
  return instructions.reduce(runInstruction, initialGridInfo);
};

export const day8 = (input: string[]) => {
  const finalGridInfo = runAllInstructions(input);
  return countValueInGrid(finalGridInfo, '#');
};

export const day8part2 = (input: string[]) => {
  const finalGridInfo = runAllInstructions(input);
  return printGrid(finalGridInfo);
};

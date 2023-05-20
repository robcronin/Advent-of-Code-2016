import { Grid } from '../utils/grid';

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

const runInstruction = (grid: Grid<string>, instruction: Instruction) => {
  const { isRect, width, height, isRotate, type, index, shift } = instruction;
  const newGrid = grid.createDeepCopy();
  if (isRect) {
    newGrid.runSettingFn(({ coords: { x, y }, value }) => {
      if (x < height && y < width) return '#';
      return value;
    });
  } else if (isRotate && type === 'row') {
    newGrid.runSettingFn(({ coords: { x, y }, value }) => {
      if (x === index) return grid.get(grid.loopCoords({ x, y: y - shift }));
      return value;
    });
  } else if (isRotate && type === 'column') {
    newGrid.runSettingFn(({ coords: { x, y }, value }) => {
      if (y === index) return grid.get(grid.loopCoords({ x: x - shift, y }));
      return value;
    });
  }
  return newGrid;
};

const runAllInstructions = (input: string[]) => {
  const initialGrid = new Grid(6, 50, '.');
  const instructions = input.map(parseInstruction);
  return instructions.reduce(runInstruction, initialGrid);
};

export const day8 = (input: string[]) => {
  const finalGrid = runAllInstructions(input);
  return finalGrid.countValueInGrid('#');
};

export const day8part2 = (input: string[]) => {
  const finalGrid = runAllInstructions(input);
  return finalGrid.print();
};

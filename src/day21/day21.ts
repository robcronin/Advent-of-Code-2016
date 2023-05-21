/*
  Tried to reverse the algo but tripped up on the rotate based operation
    Small number of permutations so brute forced the options
*/
import { range } from '../utils/looping';
import { getPermutations } from '../utils/permute';

enum OpType {
  SWP_POS = 'swpPos',
  SWP_LET = 'swpLet',
  ROTATE_LEFT = 'rotateLeft',
  ROTATE_RIGHT = 'rotateRight',
  ROTATE_BASED = 'rotateBased',
  REVERSE = 'reverse',
  MOVE = 'move',
}

type Operation =
  | { type: OpType.SWP_POS; x: number; y: number }
  | { type: OpType.SWP_LET; x: string; y: string }
  | { type: OpType.ROTATE_LEFT; num: number }
  | { type: OpType.ROTATE_RIGHT; num: number }
  | { type: OpType.ROTATE_BASED; letter: string }
  | { type: OpType.REVERSE; x: number; y: number }
  | { type: OpType.MOVE; x: number; y: number };

const parseOperations = (input: string[]): Operation[] =>
  input.map((line) => {
    const words = line.split(' ');
    if (line.startsWith('swap position'))
      return { type: OpType.SWP_POS, x: +words[2], y: +words[5] };
    if (line.startsWith('swap letter'))
      return { type: OpType.SWP_LET, x: words[2], y: words[5] };
    if (line.startsWith('rotate left'))
      return { type: OpType.ROTATE_LEFT, num: +words[2] };
    if (line.startsWith('rotate right'))
      return { type: OpType.ROTATE_RIGHT, num: +words[2] };
    if (line.startsWith('rotate based'))
      return { type: OpType.ROTATE_BASED, letter: words[6] };
    if (line.startsWith('reverse'))
      return { type: OpType.REVERSE, x: +words[2], y: +words[4] };
    if (line.startsWith('move'))
      return { type: OpType.MOVE, x: +words[2], y: +words[5] };

    throw new Error(`Incorrect operation: ${line}`);
  });

const rotatePassword = (
  dir: 'left' | 'right',
  numTimes: number,
  password: string,
) => {
  const newPassword = [...password];
  const length = password.length;
  range(length).forEach((index) => {
    const offset =
      dir === 'left'
        ? (index + numTimes) % length
        : (index - numTimes + numTimes * length) % length;
    newPassword[index] = password[offset];
  });
  return newPassword.join('');
};

const swapPassword = (x: number, y: number, password: string) => {
  const newPassword = [...password];
  newPassword[x] = password[y];
  newPassword[y] = password[x];
  return newPassword.join('');
};

const runOperation = (password: string, op: Operation): string => {
  switch (op.type) {
    case OpType.SWP_POS:
      return swapPassword(op.x, op.y, password);
    case OpType.SWP_LET:
      const indexX = password.indexOf(op.x);
      const indexY = password.indexOf(op.y);
      return swapPassword(indexX, indexY, password);
    case OpType.ROTATE_LEFT:
      return rotatePassword('left', op.num, password);
    case OpType.ROTATE_RIGHT:
      return rotatePassword('right', op.num, password);
    case OpType.ROTATE_BASED:
      const index = password.indexOf(op.letter);
      const numRotations = 1 + index + (index >= 4 ? 1 : 0);
      return rotatePassword('right', numRotations, password);
    case OpType.REVERSE:
      const newPassword = [...password];
      range(op.x, op.y + 1).forEach((pos, index) => {
        newPassword[pos] = password[op.y - index];
      });
      return newPassword.join('');
    case OpType.MOVE:
      const toRemove = password[op.x];
      const removed = password.slice(0, op.x) + password.slice(op.x + 1);
      return removed.slice(0, op.y) + toRemove + removed.slice(op.y);
  }
};

const runOperations = (operations: Operation[], start: string) =>
  operations.reduce(
    (final, operation) => runOperation(final, operation),
    start,
  );

export const day21 = (input: string[], start: string) => {
  const operations = parseOperations(input);
  return runOperations(operations, start);
};

export const day21part2 = (input: string[], start: string) => {
  const operations = parseOperations(input);

  const perms = getPermutations([...start]);
  const ans = perms.find(
    (perm) => runOperations(operations, perm.join('')) === start,
  );
  return ans?.join('');
};

type Register = 'a' | 'b' | 'c' | 'd';
type Instruction =
  | {
      type: 'cpy';
      origin: Register | number;
      register: Register;
    }
  | {
      type: 'jnz';
      origin: Register | number;
      jump: number;
    }
  | {
      type: 'inc' | 'dec';
      register: Register;
    };

type State = Record<Register, number>;

const parseInstructions = (input: string[]): Instruction[] =>
  input.map((line) => {
    const [type, one, two] = line.split(' ');
    if (type === 'inc' || type === 'dec') {
      return { type, register: one as Register };
    } else if (type === 'cpy' || type === 'jnz') {
      const origin = Number.isNaN(+one) ? (one as Register) : +one;
      if (type === 'cpy') {
        return { type, origin, register: two as Register };
      }
      return { type, origin, jump: +two };
    }
    throw new Error(`Incorrect type: ${line}`);
  });

const getOrigin = (instruction: Instruction, state: State): number => {
  if (instruction.type === 'cpy' || instruction.type === 'jnz')
    return typeof instruction.origin === 'number'
      ? instruction.origin
      : state[instruction.origin];
  throw new Error('Trying to get origin from incorrect type of instruction ');
};

const runInstructions = (instructions: Instruction[], state: State) => {
  let index = 0;
  while (index < instructions.length) {
    const instruction = instructions[index];
    switch (instruction.type) {
      case 'cpy':
        state[instruction.register] = getOrigin(instruction, state);
        break;
      case 'jnz':
        if (getOrigin(instruction, state)) index += -1 + instruction.jump;
        break;
      case 'inc':
        state[instruction.register] += 1;
        break;
      case 'dec':
        state[instruction.register] -= 1;
        break;
    }
    index++;
  }
  return state;
};

export const day12 = (input: string[]) => {
  const instructions = parseInstructions(input);
  const state = { a: 0, b: 0, c: 0, d: 0 };
  runInstructions(instructions, state);
  return state.a;
};

export const day12part2 = (input: string[]) => {
  const instructions = parseInstructions(input);
  const state = { a: 0, b: 0, c: 1, d: 0 };
  runInstructions(instructions, state);
  return state.a;
};

import { sumArr } from '../utils/array';

enum DestinationType {
  BOT = 'bot',
  OUTPUT = 'output',
}
type Destination = {
  type: DestinationType;
  number: number;
};
type Comparison = {
  low: Destination;
  high: Destination;
};

type Comparisons = Record<number, Comparison>;
type State = {
  [DestinationType.BOT]: Record<number, number[]>;
  [DestinationType.OUTPUT]: Record<number, number[]>;
};

type Instructions = {
  state: State;
  comparisons: Comparisons;
};

const parseInstructions = (input: string[]): Instructions =>
  input.reduce(
    (acc: Instructions, line) => {
      if (line.startsWith('value')) {
        const groups = line.match(
          new RegExp('value ([0-9]+) goes to bot ([0-9]+)'),
        );
        if (!groups) throw new Error(`Bad instruction: ${line}`);
        const [_, value, botNum] = groups;
        return {
          ...acc,
          state: {
            ...acc.state,
            [DestinationType.BOT]: {
              ...acc.state[DestinationType.BOT],
              [+botNum]: [
                ...(acc.state[DestinationType.BOT][+botNum] || []),
                +value,
              ],
            },
          },
        };
      } else {
        const groups = line.match(
          new RegExp(
            'bot ([0-9]+) gives low to (output|bot) ([0-9]+) and high to (output|bot) ([0-9]+)',
          ),
        );
        if (!groups) throw new Error(`Bad instruction: ${line}`);
        const [_, botNum, lowType, lowNum, highType, highNum] = groups;
        return {
          ...acc,
          comparisons: {
            ...acc.comparisons,
            [+botNum]: {
              low: { type: lowType as DestinationType, number: +lowNum },
              high: { type: highType as DestinationType, number: +highNum },
            },
          },
        };
      }
    },
    {
      state: { [DestinationType.BOT]: {}, [DestinationType.OUTPUT]: {} },
      comparisons: {},
    },
  );

const getNumChipsOnBots = (state: State) =>
  sumArr(Object.values(state[DestinationType.BOT]), (i) => i.length);

const mutateRunInstructions = (
  instructions: Instructions,
  requiredComp?: [number, number],
) => {
  let compBotNum: number | undefined = undefined;
  const { state, comparisons } = instructions;
  while (getNumChipsOnBots(state) > 0) {
    Object.keys(state[DestinationType.BOT]).forEach((botNum) => {
      const botChips = state[DestinationType.BOT][+botNum];
      if (botChips.length === 2) {
        const lowChip = Math.min(...botChips);
        const highChip = Math.max(...botChips);
        if (
          requiredComp &&
          requiredComp.includes(lowChip) &&
          requiredComp.includes(highChip)
        )
          compBotNum = +botNum;

        const { low, high } = comparisons[+botNum];
        [
          { ...low, chip: lowChip },
          { ...high, chip: highChip },
        ].forEach(({ type, number, chip }) => {
          if (state[type][number]) state[type][number].push(chip);
          else state[type][number] = [chip];
        });

        state[DestinationType.BOT][+botNum] = [];
      }
    });
  }
  return compBotNum;
};

export const day10 = (input: string[], requiredComp: [number, number]) => {
  const instructions = parseInstructions(input);
  return mutateRunInstructions(instructions, requiredComp);
};

export const day10part2 = (input: string[]) => {
  const instructions = parseInstructions(input);
  mutateRunInstructions(instructions);
  const outputs = instructions.state[DestinationType.OUTPUT];
  if (
    outputs[0].length !== 1 ||
    outputs[1].length !== 1 ||
    outputs[2].length !== 1
  )
    throw new Error('More than one chip in output bins');
  return outputs[0][0] * outputs[1][0] * outputs[2][0];
};

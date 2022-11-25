const moveOnKeypad = (start: number, direction: string) => {
  if (direction === 'L') {
    if (start % 3 === 1) return start
    return start - 1
  } else if (direction === 'R') {
    if (start % 3 === 0) return start
    return start + 1
  }
  else if (direction === 'U') {
    if (start <= 3) return start
    return start - 3
  }
  else if (direction === 'D') {
    if (start >= 7) return start
    return start + 3
  }
  return start
}

const moveOnKeypad2 = (start: number, direction: string) => {
  if (direction === 'L') {
    if ([1, 2, 5, 10, 13].includes(start)) return start
    return start - 1
  } else if (direction === 'R') {
    if ([1, 4, 9, 12, 13].includes(start)) return start
    return start + 1
  }
  else if (direction === 'U') {
    if ([1, 2, 5, 4, 9].includes(start)) return start
    if ([3, 13].includes(start)) return start - 2
    return start - 4
  }
  else if (direction === 'D') {
    if ([5, 10, 13, 12, 9].includes(start)) return start
    if ([1, 11].includes(start)) return start + 2
    return start + 4
  }
  return start
}


const moveMultipleOnKeypad = (start: number, directions: string) =>
  directions.split('').reduce(moveOnKeypad, start)


const moveMultipleOnKeypad2 = (start: number, directions: string) =>
  directions.split('').reduce(moveOnKeypad2, start)

export const day2 = (input: string[]) =>
  Number(input.reduce((code, directions) => code + String(moveMultipleOnKeypad(Number(code.slice(-1)) || 5, directions)), ''))

export const day2part2 = (input: string[]) => {
  const hexCode = input.reduce((code: number[], directions) =>
    [...code, moveMultipleOnKeypad2(code[code.length - 1] || 5, directions)], [])
  return hexCode.reduce((ans, num) => ans + num.toString(16), '')
}

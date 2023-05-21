const dragonCurveIncrease = (input: string, target: number) => {
  let result = input;
  while (result.length < target) {
    const reverse = [...result]
      .reverse()
      .map((num) => (num === '0' ? '1' : '0'))
      .join('');
    result = result + '0' + reverse;
  }
  return result.slice(0, target);
};

const calculateChecksum = (data: string): string => {
  let checksum = '';
  for (let i = 0; i < data.length; i += 2) {
    if (data[i] === data[i + 1]) {
      checksum += '1';
    } else {
      checksum += '0';
    }
  }
  if (checksum.length % 2 === 0) return calculateChecksum(checksum);
  return checksum;
};

export const day16 = (input: string, length: number) => {
  const fullData = dragonCurveIncrease(input, length);
  return calculateChecksum(fullData);
};

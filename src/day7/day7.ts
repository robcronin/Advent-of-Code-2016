import { countArr } from '../utils/count';

type SubnetType = 'super' | 'hyper';
type Subnets = Record<SubnetType, string[]>;

const parseSubnets = (ip: string) => {
  const subNets: Subnets = { super: [], hyper: [] };
  let sequence = '';
  let type: SubnetType = 'super';
  [...ip].forEach((char) => {
    if (char === '[') {
      if (sequence.length > 0) {
        subNets[type].push(sequence);
        sequence = '';
      }
      type = 'hyper';
    } else if (char === ']') {
      if (sequence.length > 0) {
        subNets[type].push(sequence);
        sequence = '';
      }
      type = 'super';
    } else {
      sequence += char;
    }
  });
  if (sequence.length > 0) {
    subNets[type].push(sequence);
  }
  return subNets;
};

const hasAbba = (subnet: string) =>
  [...subnet].some(
    (char, index) =>
      index < subnet.length - 2 &&
      char === subnet[index + 1] &&
      subnet[index - 1] === subnet[index + 2] &&
      subnet[index - 1] !== char,
  );

const getAbas = (subnet: string) =>
  [...subnet].reduce((abas: string[], char, index) => {
    if (
      index < subnet.length - 1 &&
      subnet[index - 1] === subnet[index + 1] &&
      subnet[index - 1] !== char
    ) {
      return [...abas, `${subnet[index - 1]}${char}${subnet[index + 1]}`];
    }
    return abas;
  }, []);

const isTlsCompliant = (subNets: Subnets) => {
  return !subNets.hyper.some(hasAbba) && subNets.super.some(hasAbba);
};

const isSslCompliant = (subNets: Subnets) => {
  const abas = subNets.super.map(getAbas).flat();

  return abas.some((aba) => {
    const bab = `${aba[1]}${aba[0]}${aba[1]}`;
    return subNets.hyper.some((hyperNet) => hyperNet.includes(bab));
  });
};

export const day7 = (input: string[]) =>
  countArr(input, (ip) => isTlsCompliant(parseSubnets(ip)));

export const day7part2 = (input: string[]) =>
  countArr(input, (ip) => isSslCompliant(parseSubnets(ip)));

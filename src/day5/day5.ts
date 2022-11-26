import md5 from 'md5';

const genPassword = (input: string) => {
  let password = '';
  let index = 0;
  while (password.length < 8) {
    const hash = md5(`${input}${index}`);
    if (hash.startsWith('00000')) {
      password += hash[5];
    }
    index++;
  }
  return password;
};

const genPassword2 = (input: string) => {
  let password = '________';
  let index = 0;
  while (password.includes('_')) {
    const hash = md5(`${input}${index}`);
    if (hash.startsWith('00000')) {
      const position = +hash[5];
      if (position < 8 && password[position] === '_') {
        password =
          password.substring(0, position) +
          hash[6] +
          password.substring(position + 1);
      }
      console.log({ index, password });
    }
    index++;
  }
  return password;
};

export const day5 = (input: string) => genPassword(input);
export const day5part2 = (input: string) => genPassword2(input);

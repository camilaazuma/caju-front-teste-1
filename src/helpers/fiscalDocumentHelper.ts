const validateCPFDigit = (arr: number[], position: number): boolean => {
  let factor: number;
  let arrDigit: number;
  let sum = 0;

  if (position === 1) {
    factor = 10;
    arrDigit = 9;
  } else {
    factor = 11;
    arrDigit = 10;
  }

  for (let i = 0; i < arrDigit; i += 1) {
    sum += arr[i] * factor;
    factor -= 1;
  }

  const division = Math.floor(sum % 11);
  let verifyingDigit = 0;

  if (division > 1) {
    verifyingDigit = 11 - division;
  }

  if (arr[arrDigit] !== verifyingDigit) {
    return false;
  }

  return true;
};

export const validateCPF = (cpf: string): boolean => {
  const filteredCPF = cpf.replace(/\.|-|\//g, "");

  if (filteredCPF.length !== 11) {
    return false;
  }

  const arrCPF: number[] = Array.from(filteredCPF, Number);

  const repeatedNumbers: boolean = arrCPF.every(
    (num, i, arr) => num === arr[0]
  );
  if (repeatedNumbers) {
    return false;
  }

  const firstDigit = validateCPFDigit(arrCPF, 1);
  const secondDigit = validateCPFDigit(arrCPF, 2);
  if (!firstDigit || !secondDigit) {
    return false;
  }

  return true;
};

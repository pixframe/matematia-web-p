export const pad = (num: number, size: number): string => {
  let numString = num.toString();
  while (numString.length < size) numString = '0' + numString;
  return numString;
};

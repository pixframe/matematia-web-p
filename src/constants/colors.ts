export type ButtonColor = {
  primary: string;
  shadow: string;
};

export const colors: ButtonColor[] = [
  { primary: '#FF777C', shadow: '#B55457' },
  { primary: '#66C3B8', shadow: '#3F7E76' },
  { primary: '#A061EB', shadow: '#7443AF' },
  { primary: '#C9BD5D', shadow: '#847C3A' },
  { primary: '#AAAAAA', shadow: '#888888' },
  { primary: '#AA0000', shadow: '#880000' },
  { primary: '#880088', shadow: '#440044' }
];

export const inactiveColor: ButtonColor = {
  primary: '#505271',
  shadow: '#2B2B2B'
};

export const platformColors = {
  main: '#3474B5',
  shadowMain: '#215188',
  titleColor: 'white',
  secondary: '#FFA427',
  cardColor: 'white',
  textColor: 'black'
};

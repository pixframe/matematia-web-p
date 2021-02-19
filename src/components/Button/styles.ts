import { stylesheet } from 'typestyle';

export const defaultColors = {
  hover: '#5A6EBE',
  textColor: '#fff',
  backgroundColor: '#43C3FB',
  borderColor: '#43C3FB',
  backgroundColorHover: '#3caee0'
};

export const whiteColors = {
  hover: '#e4e8f0',
  textColor: '#595b97',
  backgroundColor: '#fff',
  borderColor: '#e4e8f0',
  textHover: '#fff'
};

export const greenColors = {
  hover: '#4b7cf3',
  textColor: '#fff',
  backgroundColor: '#41b883',
  borderColor: '#41b883',
  backgroundColorHover: '#3dad7b'
};

export const ButtonBase = {
  buttonContainer: {},
  button: {
    borderRadius: '0.2em',
    color: `${defaultColors.textColor}`,
    background: `${defaultColors.backgroundColor}`,
    border: `1px solid ${defaultColors.backgroundColor}`,
    fontSize: '1em',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    width: '10em',
    height: '2.9em',
    $nest: {
      '&:hover': {
        background: `${defaultColors.backgroundColorHover}`
      }
    }
  },
  buttonWhite: {
    color: `${whiteColors.textColor}`,
    background: `${whiteColors.backgroundColor}`,
    border: `1px solid ${whiteColors.borderColor}`,

    $nest: {
      '&:hover': {
        background: `${whiteColors.hover}`
      }
    }
  },
  buttonGreen: {
    color: `${greenColors.textColor}`,
    background: `${greenColors.backgroundColor}`,
    border: `1px solid ${whiteColors.borderColor}`,

    $nest: {
      '&:hover': {
        background: `${greenColors.backgroundColorHover}`
      }
    }
  }
};

const styles = stylesheet(ButtonBase);

export default styles;

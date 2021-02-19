import { stylesheet } from 'typestyle';
import { BaseInput } from '../styles';
import { platformColors } from '../../../constants/colors';

const styles = stylesheet({
  ...BaseInput,
  radio: {
    height: '2em',
    width: '20%',
    color: platformColors.main
  },
  radioLabel: {
    marginLeft: '2%',
    fontSize: '1em',
    width: '77%',
    color: '#666'
  },
  radios: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-around'
  },
  errorContainer: {
    height: '1em',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  error: {
    color: 'red'
  }
});

export default styles;
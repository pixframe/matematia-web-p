import { stylesheet } from 'typestyle';
import { BaseInput } from '../styles';

const styles = stylesheet({
  ...BaseInput,
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

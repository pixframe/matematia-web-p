import { stylesheet } from 'typestyle';
import { BaseInput } from '../styles';

const styles = stylesheet({
  ...BaseInput,
  input: {
    ...BaseInput.input,
    height: 'auto',
    minHeight: '4em'
  }
});

export default styles;

import { stylesheet } from 'typestyle';
import { BaseInput } from '../styles';

const styles = stylesheet({
  ...BaseInput,
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0.3em 0.6em',
    background: 'rgba(0, 0, 0, 0.04)',
    borderRadius: '0.3em',
    minHeight: '2.6em'
  },

  text: {
    color: '#666',
    textAlign: 'justify',
    padding: '0.2em 0 0.2em 1em',
    fontSize: '0.8em',
    userSelect: 'none'
  }
});

export default styles;

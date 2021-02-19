import { stylesheet } from 'typestyle';
import { BaseInput } from '../styles';

const styles = stylesheet({
  ...BaseInput,
  wrapper: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  imageContainer: {
    background: 'rgba(0, 0, 0, 0.03)',
    position: 'relative',
    width: '100%',
    height: '14.3em',
    overflow: 'hidden',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '1em'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  customInputContainer: {
    padding: '0 !important'
  },
  customInputText: {
    border: '0 !important',
    margin: 0
  }
});

export default styles;

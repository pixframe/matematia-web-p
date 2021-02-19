import { stylesheet } from 'typestyle';

const styles = stylesheet({
  formSectionsNav: {
    padding: '0 2em',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  },
  button: {
    fontSize: '0.9em',
    color: '#666',
    padding: '0.6em',
    borderBottom: '3px solid transparent',
    marginRight: '1em'
  },
  activeButton: {
    borderColor: '#1a73e8',
    color: '#1a73e8'
  }
});

export default styles;

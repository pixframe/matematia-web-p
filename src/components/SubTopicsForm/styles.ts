import { stylesheet } from 'typestyle';

const styles = stylesheet({
  container: {
    width: '100%'
  },
  inputsWrapper: {
    padding: '2em'
  },
  sectionHeader: {
    background: 'rgba(0, 0, 0, .03)',
    padding: '.6em',
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'center',
    borderBottom: '1px solid rgba(0, 0, 0, .09)'
  },
  sectionHeaderButton: {
    fontSize: '1em',
    height: '2.4em',
    padding: '0 1em',
    borderRadius: '6px',
    background: '#1a73e8',
    marginLeft: '0.5em',
    color: '#fff',
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2)',
    width: '5em',
    '&:hover': {
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 5px 1px rgba(0, 0, 0, 0.35)'
    }
  }
});

export default styles;

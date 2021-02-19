import { stylesheet } from 'typestyle';

const styles = stylesheet({
  container: {
    width: '100%'
  },
  spacer: {
    height: '0.25em',
    width: '100%',
    borderRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, .2)'
  },
  title: {
    fontSize: '1.4em',
    width: '100%',
    textAlign: 'left',
    padding: '1em 0',
    fontWeight: 600,
    color: '#777'
  },
  links: {},
  link: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5em 0'
  },
  linkText: {
    padding: '0 1em',
    color: '#555',
    fontSize: '1.1em'
  }
});

export default styles;

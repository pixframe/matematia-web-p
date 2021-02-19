import { stylesheet } from 'typestyle';

const styles = stylesheet({
  displayDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    flexFlow: 'row',
    width: '100%',
    maxHeight: '5em'
  },
  displayLabel: {
    fontSize: '2.2em',
    fontWeight: 'bold',
    display: 'flex',
    verticalAlign: 'middle',
    textAlign: 'start',
    flexGrow: 4
  },
  imageClass: {
    width: '11em',
    height: '11em',
    verticalAlign: 'middle'
  },
  imageContainer: {
    height: '100%',
    display: 'flex',
    verticalAlign: 'middle',
    padding: '1em 0',
    textAlign: 'center',
    flexFlow: 'column',
    justifyContent: 'center',
    flexGrow: 2
  }
});

export default styles;

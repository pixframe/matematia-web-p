import { stylesheet } from 'typestyle';

const styles = stylesheet({
  answerContainer: {
    backgroundSize: 'cover',
    height: '95vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column'
  },
  answerDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    flexFlow: 'row',
    width: '100%',
    maxHeight: '5em'
  },
  answerLabel: {
    fontSize: '2.2em',
    fontWeight: 'bold',
    display: 'flex',
    verticalAlign: 'middle',
    textAlign: 'start',
    flexGrow: 4
  },

  buttonsRow: {
    margin: '1em auto'
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
  },

  explanationDisplay: {
    fontSize: '1.5em',
    margin: '2em auto 4em',
    display: 'flexbox',
    fontStyle: 'italic',
    textAlign: 'justify',
    width: '45%'
  }
});

export default styles;

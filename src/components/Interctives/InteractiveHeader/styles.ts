import { stylesheet } from 'typestyle';

export const styles = stylesheet({
  liveImg: {
    width: '3em',
    height: '3em',
    margin: '0.3em'
  },
  livesDiv: {
    display: 'flex',
    flexFlow: 'row',
    height: '5em',
    alignItems: 'center'
  },
  hintImage: {
    width: '5em',
    height: '5em'
  },
  mainDiv: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1em',
    marginRight: '1em',
    width: '90%'
  }
});

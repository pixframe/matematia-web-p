import { stylesheet } from 'typestyle';
import { platformColors } from '../../constants/colors';

export const styles = stylesheet({
  backImg: {
    position: 'absolute',
    width: '48vw',
    height: '27vw',
    opacity: '0.5',
    borderRadius: '2em',
    zIndex: 0
  },
  boooksDiv: {
    display: 'flex',
    flexFlow: 'column'
  },
  booksInfo: {
    color: platformColors.titleColor,
    fontSize: '1.7em',
    margin: '1.2em'
  },
  booksTitle: {
    color: platformColors.titleColor,
    fontSize: '2.2em',
    textAlign: 'center',
    marginBottom: '1.5em'
  },
  card: {
    backgroundColor: platformColors.cardColor,
    width: '45%',
    display: 'flex',
    flexFlow: 'row',
    margin: '2%',
    padding: '0.5em',
    alignItems: 'center',
    borderRadius: '0.5em'
  },
  cardGrid: {
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
    width: '50%'
  },
  cardImg: {
    height: '4em',
    width: '4em',
    marginRight: '1em'
  },
  cardText: {
    fontSize: '1.4em',
    fontWeight: 'bold'
  },
  cardRef: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    color: platformColors.textColor
  },
  carrosuselDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%'
  },
  columnInfo: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    width: '40%'
  },
  imgPrevious: {
    width: '50vw',
    height: '28vw',
    padding: '0.5em',
    display: 'table',
    margin: '1em',
    backgroundColor: platformColors.titleColor,
    zIndex: 1
  },
  imgReward: {
    marginRight: '2em'
  },
  notPassText: {
    color: platformColors.titleColor,
    fontSize: '1.2em',
    width: '60%',
    textAlign: 'center'
  },
  resultDiv: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '3.2em',
    marginTop: '3.2em'
  },
  resultText: {
    color: platformColors.titleColor,
    fontWeight: 'bold',
    fontSize: '1.8em',
    width: '80%',
    textAlign: 'center'
  },
  rewardSection: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '2%'
  },
  textReward: {
    color: platformColors.titleColor,
    fontSize: '3em',
    fontWeight: 'bold'
  },
  title: {
    color: platformColors.titleColor,
    fontSize: '3.2em',
    fontWeight: 'bold'
  },
  videoDiv: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '85%'
  },
  videoImg: {
    height: '4em',
    width: '4em'
  }
});

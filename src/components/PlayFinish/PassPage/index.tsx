import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'i18next';
import { style } from 'typestyle';
import Confetti from 'react-confetti';
import { styles } from '../styles';
import { platformColors } from '../../../constants/colors';
import coins from '../../../assets/images/icons/result/coins.svg';
import points from '../../../assets/images/icons/result/points.svg';
import Button from '../../UI/Button';
import shine from '../../../assets/images/background/shine.svg';

interface PassPageProps {
  answers: number;
  i18n: i18n | undefined;
  getCorrectImage: () => string;
  pointsForAnswer: number;
  coinsForAnswer: number;
  imageDivClass: string;
}

const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingTop: '2em',
  paddingBottom: '2em',
  height: '94vh',
  backgroundSize: 'cover, 600vh',
  backgroundImage: `url(${shine})`,
  backgroundColor: platformColors.main
});

const PassPage: React.FC<PassPageProps> = ({
  answers,
  i18n,
  getCorrectImage,
  pointsForAnswer,
  coinsForAnswer,
  imageDivClass
}) => {
  return (
    <div className={container}>
      {answers === 10 && (
        <Confetti
          numberOfPieces={100}
          colors={[platformColors.secondary, platformColors.shadowMain]}
          style={{ width: '98vw' }}
        />
      )}
      <div className={styles.title}>{i18n?.t('theme.finish.aproved')}</div>
      <div className={styles.resultDiv}>
        <div className={imageDivClass}>
          {answers > 7 && <img src={getCorrectImage()} alt="result" />}
        </div>
        <div className={styles.columnInfo}>
          <div className={styles.rewardSection}>
            <img className={styles.imgReward} src={points} alt="points" />
            <p className={styles.textReward}>{`${answers * pointsForAnswer} ${i18n?.t(
              'theme.finish.points'
            )}`}</p>
          </div>
          <div className={styles.rewardSection}>
            <img className={styles.imgReward} src={coins} alt="coins" />
            <p className={styles.textReward}>{answers * coinsForAnswer}</p>
          </div>
        </div>
      </div>
      <h1 className={styles.resultText}>{i18n?.t(`result_${answers}`)}</h1>
      <Link to="/">
        <Button label={i18n?.t('common.next') as string} fontSize="1.2em" onClick={() => null} />
      </Link>
    </div>
  );
};

export default PassPage;

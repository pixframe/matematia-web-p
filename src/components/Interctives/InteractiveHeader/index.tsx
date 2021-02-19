import React from 'react';
import QuestionIndex from '../QuestionIndex';
import hint from '../../../assets/images/icons/hint.svg';
import ayuda from '../../../assets/images/icons/ayuda.svg';
import corazon from '../../../assets/icons/corazon.svg';
import { styles } from './styles';

interface InteractiveHeaderProps {
  onHintPressed?: () => void;
  onHelpPressed?: () => void;
  isPlayTime: boolean;
  numOfQuestions: number;
  currentQuestion: number;
  currentLives: number;
}

const InteractiveHeader: React.FC<InteractiveHeaderProps> = ({
  onHintPressed,
  onHelpPressed,
  isPlayTime,
  numOfQuestions,
  currentQuestion,
  currentLives
}) => {
  const lives: React.ReactNode[] = [];
  for (let i = 0; i <= currentLives; i++) {
    lives.push(<img className={styles.liveImg} src={corazon} alt="vida" />);
  }
  return (
    <div className={styles.mainDiv}>
      <div>
        <QuestionIndex numberOfQuestions={numOfQuestions} currentQuestion={currentQuestion} />
      </div>
      {isPlayTime && (
        <div className={styles.livesDiv}>
          {lives}
          <img src={hint} alt="pista" className={styles.hintImage} onClick={onHintPressed} />
          <img src={ayuda} alt="ayuda" className={styles.hintImage} onClick={onHelpPressed} />
        </div>
      )}
    </div>
  );
};

export default InteractiveHeader;

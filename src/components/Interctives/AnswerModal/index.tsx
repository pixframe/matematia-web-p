import React from 'react';
import { style } from 'typestyle';
import styles from './styles';
import Button from '../../UI/Button';
import { Question, Answer, Exercise } from '../../../utils/types';
import checkExerciseAnswers from '../../../utils/isCorrect';
import DisplayDiv from '../DisplayDiv';
import Correcto from '../../../assets/icons/correcto.svg';
import Tache from '../../../assets/icons/tache.svg';

interface Props {
  exercise: Exercise;
  answers: [Question, Answer][];
  onContinue: () => void;
  contrastColor?: string;
  color?: string;
}

const AnswerModal: React.FC<Props> = ({ answers, onContinue, exercise, color = 'white' }) => {
  const question = answers?.[0]?.[0];
  const isCorrect = checkExerciseAnswers(exercise.type, answers);

  const textColor = style({
    color
  });

  return (
    <div className={styles.answerContainer}>
      <DisplayDiv
        label={isCorrect ? 'RESPUESTA CORRECTA' : 'RESPUESTA INCORRECTA'}
        image={isCorrect ? Correcto : Tache}
      />
      <div className={[styles.explanationDisplay, textColor].join(' ')}>
        {question?.explanation}
      </div>
      <div className={styles.buttonsRow}>
        <Button label="Continuar" onClick={onContinue} fontSize="1.2em" />
      </div>
    </div>
  );
};

export default AnswerModal;

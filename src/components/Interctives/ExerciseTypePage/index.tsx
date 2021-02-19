import React from 'react';
import { exercisesNames, exerciseIcon } from '../../../constants/exerciseKinds';
import { ExerciseTypeNames } from '../../../utils/types';
import { styles } from './style';
import { style } from 'typestyle';

interface ExerciseTypePageProps {
  typeOfExercise: ExerciseTypeNames;
  backgroundColor?: string;
}

const ExerciseTypePage: React.FC<ExerciseTypePageProps> = ({
  typeOfExercise,
  backgroundColor = '#275388'
}) => {
  const correctName = () =>
    exercisesNames.find((exercise) => exercise.value === typeOfExercise)?.label;

  const correctImage = () =>
    exerciseIcon.find((exercise) => exercise.value === typeOfExercise)?.image;

  const circleDiv = style({
    borderRadius: '50%',
    backgroundColor: `${backgroundColor}`,
    padding: '3em'
  });

  const textDisplay = style({
    width: '100%',
    backgroundColor: `${backgroundColor}`,
    textAlign: 'center',
    padding: '2em',
    position: 'relative',
    bottom: '2.5em'
  });

  const topicTextDisplay = style({
    fontSize: '2em',
    color: 'white',
    fontWeight: 'bold'
  });

  return (
    <div className={styles.typeDiv}>
      <div className={circleDiv}>
        <img className={styles.imageIcon} src={correctImage()} alt={correctName()} />
      </div>
      <div className={textDisplay}>
        <span className={topicTextDisplay}>{correctName()}</span>
      </div>
    </div>
  );
};

export default ExerciseTypePage;

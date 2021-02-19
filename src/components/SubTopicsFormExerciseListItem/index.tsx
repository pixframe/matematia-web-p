import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { Exercise } from '../../utils/types';

interface Props {
  onRemove?: (id: string) => void;
  data: Exercise;
  path: string;
}

const SubTopicsFormExerciseListItem: React.FC<Props> = ({ onRemove, data, path }) => {
  return (
    <div className={styles.container}>
      <Link className={styles.wrapper} to={path}>
        <div className={styles.name}>
          {data.type === 'columns' || data.type === 'classification'
            ? data.text
            : data.questions[0].text}
        </div>
      </Link>
      <button onClick={() => onRemove?.(data.id)} className={styles.remove}>
        <FontAwesomeIcon icon={faMinusCircle} />
      </button>
    </div>
  );
};

export default SubTopicsFormExerciseListItem;

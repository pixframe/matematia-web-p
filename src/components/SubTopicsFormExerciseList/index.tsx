import React from 'react';
import SubTopicsFormExerciseListItem from '../SubTopicsFormExerciseListItem';
import { Exercise } from '../../utils/types';
import styles from './styles';

interface Props {
  data: Exercise[];
  path: string;
}

const SubTopicsFormExerciseList: React.FC<Props> = ({ data, path }) => (
  <div className={styles.container}>
    {data.map((item) => (
      <SubTopicsFormExerciseListItem
        key={item.id}
        data={item}
        path={`${path}/exercises/${item.id}`}
      />
    ))}
  </div>
);

export default SubTopicsFormExerciseList;

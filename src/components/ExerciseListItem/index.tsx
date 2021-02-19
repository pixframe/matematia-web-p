import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { Exercise } from '../../utils/types';

interface Props {
  data: Exercise;
  path: string;
}

const SubTopicListItem: React.FC<Props> = ({ path, data }) => {
  return (
    <Link className={styles.item} to={`${path}/${data.id}`}>
      <div className={styles.itemName}>{data.text}</div>
    </Link>
  );
};

export default SubTopicListItem;

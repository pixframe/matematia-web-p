import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { Subtopic } from '../../utils/types';

interface Props {
  data: Subtopic;
  path: string;
}

const SubTopicListItem: React.FC<Props> = ({ path, data }) => {
  return (
    <Link className={styles.item} to={`${path}/${data.id}`}>
      <div className={styles.itemName}>{data.name}</div>
    </Link>
  );
};

export default SubTopicListItem;

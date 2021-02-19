import React from 'react';
import { style } from 'typestyle';
import { Link } from 'react-router-dom';

interface TopicListItemProps {
  name: string;
  id: string;
  path: string;
}

const item = style({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  width: '100%',
  overflow: 'hidden',
  breakInside: 'avoid',
  background: '#fff',
  fontSize: '0.9em'
});

const itemName = style({
  display: 'block',
  fontSize: '1em',
  color: '#333',
  padding: '1em',
  overflow: 'hidden',
  width: '100%'
});

const topicListItem: React.FC<TopicListItemProps> = ({ name, id, path }) => {
  return (
    <Link className={item} to={`${path}/${id}`}>
      <div className={itemName}>{name}</div>
    </Link>
  );
};

export default topicListItem;

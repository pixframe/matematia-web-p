import React from 'react';
import { style } from 'typestyle';

export interface SubTopicSelectListItemProps {
  id: string;
  label: string;
  isSelected: boolean;
  onSelection: (id: string, isSelected: boolean) => void;
}

const item = style({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  width: '100%',
  overflow: 'hidden',
  breakInside: 'avoid',
  background: '#fff',
  fontSize: '0.9em',
  padding: '0 1.5em 0 0.5em'
});

const itemName = style({
  display: 'inline',
  fontSize: '1em',
  color: '#333',
  padding: '1em',
  overflow: 'hidden',
  width: '100%'
});

const SubTopicSelectListItem: React.FC<SubTopicSelectListItemProps> = ({
  id,
  label,
  isSelected,
  onSelection
}) => {
  return (
    <div className={item} onClick={() => onSelection(id, isSelected)}>
      <div className={itemName}>{label}</div>
      <input type="checkbox" checked={isSelected}></input>
    </div>
  );
};

export default SubTopicSelectListItem;

import React, { Children } from 'react';
import { style } from 'typestyle';

interface Props {
  click: () => void;
  selected?: boolean;
}

const iconContainer = style({
  display: 'inline',
  $nest: {
    '& > div:first-child': {
      display: 'none'
    },
    '& > div:last-child': {
      display: 'block'
    },
    '&:hover': {
      $nest: {
        '& > div:first-child': {
          display: 'block'
        },
        '& > div:last-child': {
          display: 'none'
        }
      }
    }
  }
});

const RatingIcon: React.FC<Props> = ({ click, selected, children }) => {
  const items = Children.toArray(children);
  return (
    <div onClick={click} className={iconContainer}>
      <div style={selected ? { display: 'block' } : {}}>{items[0]}</div>
      <div style={selected ? { display: 'none' } : {}}>{items[1]}</div>
    </div>
  );
};

export default RatingIcon;

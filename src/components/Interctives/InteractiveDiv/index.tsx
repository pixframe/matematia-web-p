import React from 'react';
import { style } from 'typestyle';

interface InteractiveDivProps {
  width?: string;
  children?: React.ReactNode;
}

const InteractiveDiv: React.FC<InteractiveDivProps> = ({ width = '90%', children }) => {
  const mainDiv = style({
    display: 'flex',
    justifyContent: 'center'
  });

  const childrenDiv = style({
    paddingTop: '2em',
    paddingBottom: '2em',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    width
  });

  return (
    <div className={mainDiv}>
      <div className={childrenDiv}>{children}</div>
    </div>
  );
};

export default InteractiveDiv;

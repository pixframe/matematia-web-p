import React from 'react';
import { style } from 'typestyle';

interface ProgressBarProps {
  percentage: number;
}

const progressBar = style({
  backgroundColor: '#CCCCCC',
  height: '2em',
  borderRadius: '0.4em',
  marginBottom: '0.2em',
  width: '70%'
});

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const moveBar = style({
    backgroundColor: '#0071BC',
    width: `${percentage}%`
  });

  return (
    <div className={progressBar}>
      <div className={[progressBar, moveBar].join(' ')} />
    </div>
  );
};

export default ProgressBar;

import React from 'react';
import { style } from 'typestyle';
import { platformColors } from '../../constants/colors';

interface PlayTitleProps {
  title: string;
}

const titleDiv = style({
  backgroundColor: platformColors.shadowMain,
  width: '45%',
  textAlign: 'center',
  padding: '0.6em'
});

const titleStyle = style({
  color: platformColors.titleColor,
  fontWeight: 'bold',
  fontSize: '1.8em'
});

const PlayTitle: React.FC<PlayTitleProps> = ({ title }) => {
  return (
    <div className={titleDiv}>
      <p className={titleStyle}>{title}</p>
    </div>
  );
};

export default PlayTitle;

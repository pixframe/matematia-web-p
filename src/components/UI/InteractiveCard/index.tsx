import React from 'react';
import { style } from 'typestyle';
import { platformColors } from '../../../constants/colors';

interface InteractiveCardProps {
  backgroundColor?: string;
  minWidth?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  margin?: string;
  shadowColor?: string;
}

const roundedBorders = style({
  borderRadius: '1em',
  display: 'flex',
  padding: '1em',
  justifyContent: 'center'
});

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  backgroundColor = platformColors.main,
  minWidth = '30%',
  children,
  onClick,
  margin = '1em',
  shadowColor = platformColors.shadowMain
}) => {
  return (
    <div
      className={roundedBorders}
      style={{
        backgroundColor: backgroundColor,
        minWidth: minWidth,
        margin: margin,
        boxShadow: `0 0.5em ${shadowColor}`
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default InteractiveCard;

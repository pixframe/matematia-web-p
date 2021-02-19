import React from 'react';
import { style } from 'typestyle';
import { ButtonColor, inactiveColor } from '../../../constants/colors';

interface DragabbleProps {
  label: string;
  id?: string;
  onDragEnd?: () => void;
  backgroundColor?: string;
  shadowColor?: string;
  buttonColor?: ButtonColor;
  color?: string;
  fontSize?: string;
  minWidth?: string;
  maxWidth?: string;
}

const Dragabble: React.FC<DragabbleProps> = ({
  label,
  id,
  onDragEnd,
  buttonColor = inactiveColor,
  color = 'white',
  fontSize = '1em',
  minWidth,
  maxWidth
}) => {
  const buttonData = style({
    backgroundColor: `${buttonColor.primary}`,
    boxShadow: `0 0.5em ${buttonColor.shadow}`,
    margin: '0.5em 2em',
    display: 'inline',
    padding: '0.6em',
    fontSize: fontSize,
    color: color,
    borderRadius: '0.2em',
    minWidth,
    maxWidth,
    textAlign: 'center'
  });

  return (
    <div id={id} className={buttonData} onDragEnd={onDragEnd} draggable>
      {label}
    </div>
  );
};

export default Dragabble;

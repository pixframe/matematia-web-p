import React from 'react';
import { style } from 'typestyle';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  backgroundColor?: string;
  shadowColor?: string;
  color?: string;
  fontSize?: string;
  minWidth?: string;
  width?: string;
  margin?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  backgroundColor = '#FBB03B',
  shadowColor = '#BC842C',
  color = 'white',
  fontSize = '1em',
  minWidth,
  width,
  margin = '1em 2em'
}) => {
  const buttonData = style({
    backgroundColor: `${backgroundColor}`,
    boxShadow: `0 0.5em ${shadowColor}`,
    margin: margin,
    display: 'inline',
    padding: '0.6em',
    fontSize: fontSize,
    color: color,
    borderRadius: '0.2em',
    minWidth: minWidth,
    width: width,
    textAlign: 'center'
  });

  return (
    <div className={buttonData} onClick={onClick}>
      {label}
    </div>
  );
};

export default Button;

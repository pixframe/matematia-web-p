import React from 'react';
import { style } from 'typestyle';
import fondo from '../../../assets/fondo.svg';

interface BackgroundDivProps {
  children?: React.ReactNode;
  backImage?: string;
  backgroundColor?: string;
}

const BackgroundDiv: React.FC<BackgroundDivProps> = ({
  children,
  backImage = fondo,
  backgroundColor = '#0071BC'
}) => {
  const backImageDiv = style({
    backgroundImage: `url('${backImage}')`,
    backgroundColor,
    minHeight: '94vh'
  });

  return <div className={backImageDiv}> {children} </div>;
};

export default BackgroundDiv;

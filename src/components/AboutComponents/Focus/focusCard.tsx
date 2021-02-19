import React from 'react';
import { style } from 'typestyle';

interface FocusCardProps {
  name: string;
  description: string;
  icon: string;
}

const cardDiv = style({
  width: '17%',
  border: '1px solid #C6C6C6',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '1em'
});

const margin = style({
  marginBottom: '1em',
  marginTop: '1em',
  fontSize: '1.5em'
});

const descriptionDiv = style({
  fontSize: '1.2em'
});

const FocusCard: React.FC<FocusCardProps> = ({ name, description, icon }) => {
  return (
    <div className={cardDiv}>
      <img src={icon} alt={name} />
      <h1 className={margin}>{name}</h1>
      <p className={descriptionDiv}>{description}</p>
    </div>
  );
};

export default FocusCard;

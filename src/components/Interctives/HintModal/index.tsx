import React from 'react';
import { style } from 'typestyle';
import DisplayDiv from '../DisplayDiv';
import hint from '../../../assets/images/icons/hint.svg';
import Button from '../../UI/Button/index';

interface HintModalProps {
  help: string;
  onUnderstand?: () => void;
}

const hintContainer = style({
  backgroundSize: 'cover',
  height: '95vh',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexFlow: 'column',
  paddingTop: '2em'
});

const hintDisplay = style({
  fontSize: '1.5em',
  margin: '2em auto 4em',
  display: 'flexbox',
  fontStyle: 'italic',
  textAlign: 'justify',
  width: '60%',
  color: 'white'
});

const HintModal: React.FC<HintModalProps> = ({ help, onUnderstand }) => {
  return (
    <div className={hintContainer}>
      <DisplayDiv label="AYUDA" image={hint} />
      <div className={hintDisplay}>{help}</div>
      <Button label="Entendido" onClick={onUnderstand} />
    </div>
  );
};

export default HintModal;

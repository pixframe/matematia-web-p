import React from 'react';
import { style } from 'typestyle';
import Modal from '../../Modal';
import Button from '../../UI/Button';

interface HelpModalProps {
  help: string;
  isOpen: boolean;
  close: () => void;
}

const helpStyle = style({
  display: 'flex',
  flexFlow: 'column',
  padding: '2em',
  alignItems: 'center'
});

const helpLabel = style({
  fontSize: '1.5em',
  fontWeight: 'bold',
  marginBottom: '1em'
});

const helpText = style({
  fontStyle: 'italic',
  marginBottom: '1em'
});

const HelpModal: React.FC<HelpModalProps> = ({ help, isOpen, close }) => {
  return (
    <Modal onClose={close} open={isOpen} needCloseButton={false}>
      <div className={helpStyle}>
        <span className={helpLabel}>¿CÓMO FUNCIONA?</span>
        <span className={helpText}>{help}</span>
        <Button label="ENTENDIDO" onClick={close} backgroundColor="#3589E7" shadowColor="#32659D" />
      </div>
    </Modal>
  );
};

export default HelpModal;

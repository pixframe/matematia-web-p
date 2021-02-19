import React, { useState } from 'react';
import { Question, Answer } from '../../../utils/types';
import { style } from 'typestyle';
import InputText from '../../Input/InputText';
import Button from '../../UI/Button';

export interface ClosedAnswerInteractiveProps {
  data: Question[];
  onAnswer: (answers: [Question, Answer][]) => void;
}

const buttons = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline'
});

const textSize = style({
  width: '85%'
});

const ClosedAnswerInteractive: React.FC<ClosedAnswerInteractiveProps> = ({ data, onAnswer }) => {
  const [value, changeValue] = useState('');
  const question = data[0] || {};
  return (
    <div className={buttons}>
      <InputText
        id=""
        value={value}
        onChange={(value) => changeValue(value)}
        containerClassname={textSize}
        placeholder="Respuesta"
      />
      <Button
        label="Responder"
        onClick={() =>
          onAnswer([
            [question, { id: 'user', text: value, image: '', explanation: '', isCorrect: false }]
          ])
        }
        minWidth="10%"
      />
    </div>
  );
};

export default ClosedAnswerInteractive;

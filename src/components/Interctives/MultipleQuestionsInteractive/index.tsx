import React, { useState } from 'react';
import { Question, Answer } from '../../../utils/types';
import { style } from 'typestyle';
import InputText from '../../Input/InputText';
import Button from '../../UI/Button';
import uid from 'uid';

export interface MultipleQuestionsInteractiveProps {
  data: Question[];
  onAnswer: (answers: [Question, Answer][]) => void;
}

const buttons = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'baseline'
});

const questionDiv = style({
  display: 'flex',
  flexFlow: 'column',
  width: '50%',
  paddingLeft: '2em',
  paddingRight: '2em',
  verticalAlign: 'middle',
  alignSelf: 'flex-end'
});

const questions = style({
  display: 'flex',
  flexFlow: 'row',
  flexWrap: 'wrap',
  justifyContent: 'start'
});

const singleQuestion = style({
  color: 'white',
  fontSize: '1.2em',
  marginBottom: '0.1em'
});

const textSize = style({
  width: '100%'
});

const MultipleQuestionsInteractive: React.FC<MultipleQuestionsInteractiveProps> = ({
  data,
  onAnswer
}) => {
  const [value, changeValue] = useState(data.map(() => ''));
  return (
    <>
      <div style={{ height: '2em' }}></div>
      <div className={questions}>
        {data.map((question, index) => (
          <div className={questionDiv} key={question.id} data-testid="questions">
            <h1 className={singleQuestion}>{question.text}</h1>
            <div className={buttons}>
              <InputText
                id={`text${index}`}
                value={value[index]}
                onChange={(newValue) => {
                  const newValues = [...value];
                  newValues[index] = newValue;
                  changeValue(newValues);
                }}
                containerClassname={textSize}
                placeholder="Respuesta"
              />
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}
      >
        {!value.includes('') && (
          <Button
            label="Responder"
            minWidth="10%"
            onClick={() => {
              const answersData: [Question, Answer][] = data.map((question, index) => [
                question,
                { ...question.answers[0], text: value[index], id: uid() }
              ]);
              onAnswer(answersData);
            }}
          />
        )}
      </div>
    </>
  );
};

export default MultipleQuestionsInteractive;

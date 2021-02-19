import React from 'react';
import produce from 'immer';
import { InputTextarea } from '@calderaro/react-toolbox';
import { Question } from '../../../utils/types';
import { style, classes } from 'typestyle';

export interface TrueFalseInputProps {
  data: Question[];
  onChange: (data: Question[]) => void;
}

const answersContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1em',
  padding: '1em 0 0 0'
});

const answer = style({
  width: '100%',
  height: '2.8em',
  borderRadius: 6,
  border: '1px solid rgba(0, 0, 0, .1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  fontWeight: 600,
  color: '#666'
});

const green = style({
  border: 'solid 1px #bfed9c',
  backgroundColor: '#f6ffed',
  color: '#70cb2b'
});

const container = style({
  borderRadius: 8,
  boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
  padding: '2em',
  marginBottom: '1em'
});

export class TrueFalseInput extends React.Component<TrueFalseInputProps> {
  render() {
    const { data, onChange } = this.props;
    const question = data[0] || {};
    return (
      <div className={container}>
        <InputTextarea
          label="Pregunta"
          value={question.text}
          onChange={(text) =>
            onChange(
              produce(data, (draftState) => {
                draftState[0].text = text;
              })
            )
          }
        />
        <InputTextarea
          label="Explicación"
          value={question.explanation}
          onChange={(explanation) =>
            onChange(
              produce(data, (draftState) => {
                draftState[0].explanation = explanation;
              })
            )
          }
        />
        <div className={answersContainer}>
          <div
            className={classes(answer, data[0].answers[0].isCorrect ? green : '')}
            onClick={() =>
              onChange(
                produce(data, (draftState) => {
                  draftState[0].answers[0].isCorrect = true;
                  draftState[0].answers[1].isCorrect = false;
                })
              )
            }
          >
            <div>Verdadero es correcto</div>
          </div>
          <div
            className={classes(answer, data[0].answers[1].isCorrect ? green : '')}
            onClick={() =>
              onChange(
                produce(data, (draftState) => {
                  draftState[0].answers[1].isCorrect = true;
                  draftState[0].answers[0].isCorrect = false;
                })
              )
            }
          >
            <div>Falso es correcto</div>
          </div>
        </div>
      </div>
    );
  }
}

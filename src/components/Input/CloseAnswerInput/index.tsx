import React from 'react';
import produce from 'immer';
import { InputTextarea, Button } from '@calderaro/react-toolbox';
import uid from 'uid';
import { Question } from '../../../utils/types';
import { style } from 'typestyle';

export interface ClosedAnswerInputProps {
  data: Question[];
  onChange: (data: Question[]) => void;
}

const container = style({
  borderRadius: 8,
  boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
  padding: '2em',
  marginBottom: '1em'
});

const title = style({
  padding: '0 0 1em 0',
  fontWeight: 500
});

const questionContainer = style({
  borderRadius: 8,
  boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
  padding: '2em',
  marginBottom: '1em'
});

export class ClosedAnswerInput extends React.Component<ClosedAnswerInputProps> {
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
        <div>
          <div className={title}>Respuestas:</div>
          <div className={questionContainer}>
            {question.answers.map((answer, index) => (
              <div key={answer.id}>
                <InputTextarea
                  id=""
                  label={`Respuesta ${index + 1}`}
                  value={answer.text}
                  onChange={(text) =>
                    onChange(
                      produce(data, (draftState) => {
                        draftState[0].answers[index].text = text;
                      })
                    )
                  }
                />
              </div>
            ))}
            <Button
              onClick={() =>
                onChange(
                  produce(data, (draftState) => {
                    draftState[0].answers.push({
                      id: uid(),
                      text: '',
                      image: '',
                      explanation: '',
                      isCorrect: true
                    });
                  })
                )
              }
            >
              Agregar Respuesta
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

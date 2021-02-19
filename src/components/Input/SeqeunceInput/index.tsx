import React from 'react';
import produce from 'immer';
import { InputTextarea, Button, ButtonsContainer } from '@calderaro/react-toolbox';
import uid from 'uid';
import { Question, Answer } from '../../../utils/types';
import { style } from 'typestyle';

export interface SequenceInputProps {
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

const change = style({
  display: 'flex',
  justifyContent: 'center'
});

const infoDiv = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center'
});

export class SequenceInput extends React.Component<SequenceInputProps> {
  render() {
    const { data, onChange } = this.props;
    const question = data[0];
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
        <div>
          <div className={title}>Respuestas:</div>
        </div>
        {question.answers.map((answer, index) => (
          <div key={answer.id} className={questionContainer}>
            {index > 0 && (
              <div
                className={change}
                onClick={() => {
                  const answerToDown = question.answers[index - 1];
                  const answerToUp = question.answers[index];
                  const newAnswersOrder = [...question.answers];
                  newAnswersOrder.splice(index - 1, 1, answerToUp);
                  newAnswersOrder.splice(index, 1, answerToDown);
                  onChange(
                    produce(data, (draftState) => {
                      draftState[0].answers = newAnswersOrder;
                    })
                  );
                }}
              >
                Arriba
              </div>
            )}
            <div className={infoDiv}>
              <span>Posición: {index + 1}</span>
              {question.answers.length > 3 && (
                <Button
                  onClick={() => {
                    const newAnswers = [...question.answers];
                    newAnswers.splice(index, 1);
                    onChange(
                      produce(data, (draftState) => {
                        draftState[0].answers = newAnswers;
                      })
                    );
                  }}
                >
                  Eliminar Secuencia
                </Button>
              )}
            </div>
            <InputTextarea
              id="Respuesta"
              label="Respuesta"
              value={answer.text}
              onChange={(text) =>
                onChange(
                  produce(data, (draftState) => {
                    draftState[0].answers[index].text = text;
                  })
                )
              }
            />
            <InputTextarea
              id=""
              label="Explicación"
              value={answer.explanation}
              onChange={(explanation) =>
                onChange(
                  produce(data, (draftState) => {
                    draftState[0].answers[index].explanation = explanation;
                  })
                )
              }
            />
            {index < question.answers.length - 1 && (
              <div
                className={change}
                onClick={() => {
                  const answerToDown = question.answers[index];
                  const answerToUp = question.answers[index + 1];
                  const newAnswersOrder = [...question.answers];
                  newAnswersOrder.splice(index, 1, answerToUp);
                  newAnswersOrder.splice(index + 1, 1, answerToDown);
                  onChange(
                    produce(data, (draftState) => {
                      draftState[0].answers = newAnswersOrder;
                    })
                  );
                }}
              >
                Abajo
              </div>
            )}
          </div>
        ))}
        {question.answers.length < 10 && (
          <ButtonsContainer justifyContent="flex-end" padding="1em 0 0 0">
            <Button
              onClick={() => {
                onChange(
                  produce(data, (draftState) => {
                    const newAnswer: Answer = {
                      id: uid(),
                      text: '',
                      image: '',
                      explanation: '',
                      isCorrect: true
                    };
                    const newAnswers = [...draftState[0].answers, newAnswer];
                    draftState[0].answers = newAnswers;
                  })
                );
              }}
            >
              Agregar Sequencia
            </Button>
          </ButtonsContainer>
        )}
      </div>
    );
  }
}

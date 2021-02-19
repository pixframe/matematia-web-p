import React from 'react';
import produce from 'immer';
import { InputTextarea, Button } from '@calderaro/react-toolbox';
import uid from 'uid';
import { Question } from '../../../utils/types';
import { style } from 'typestyle';

export interface MultipleQuestionsInputProps {
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

const questionRow = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between'
});

export class MultipleQuestionsInput extends React.Component<MultipleQuestionsInputProps> {
  render() {
    const { data, onChange } = this.props;
    return (
      <div className={container}>
        {data.map((question, questionIndex) => (
          <div key={`question_${questionIndex}`}>
            <div className={questionRow}>
              <h1>{`Pregunta ${questionIndex + 1}`}</h1>
              {data.length > 2 && (
                <Button
                  onClick={() => {
                    const newData = [...data];
                    newData.splice(questionIndex, 1);
                    onChange(newData);
                  }}
                >
                  Eliminar Pregunta
                </Button>
              )}
            </div>
            <InputTextarea
              label="Pregunta"
              value={question.text}
              onChange={(text) =>
                onChange(
                  produce(data, (draftState) => {
                    draftState[questionIndex].text = text;
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
                    draftState[questionIndex].explanation = explanation;
                  })
                )
              }
            />
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
                          draftState[questionIndex].answers[index].text = text;
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
                      draftState[questionIndex].answers.push({
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
        ))}
        {data.length < 5 && (
          <Button
            onClick={() =>
              onChange(
                produce(data, (drafState) => {
                  drafState.push({
                    id: uid(),
                    text: '',
                    explanation: '',
                    image: '',
                    answers: [
                      {
                        id: uid(),
                        text: '',
                        image: '',
                        explanation: '',
                        isCorrect: true
                      }
                    ]
                  });
                })
              )
            }
          >
            Agregar Pregunta
          </Button>
        )}
      </div>
    );
  }
}

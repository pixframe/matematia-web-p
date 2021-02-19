import React from 'react';
import produce from 'immer';
import { InputTextarea, Button, ButtonsContainer } from '@calderaro/react-toolbox';
import uid from 'uid';
import { Question } from '../../../utils/types';
import { style } from 'typestyle';

export interface ClassificationInputProps {
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

export class ClassificationInput extends React.Component<ClassificationInputProps> {
  render() {
    const { data, onChange } = this.props;
    return (
      <div className={container}>
        <h3 className={title}>Categorías</h3>
        {data.map((question, index) => (
          <div key={question.id} className={questionContainer}>
            <h3>{`Categoría ${index + 1}`}</h3>
            <InputTextarea
              label="Nombre de la categoría"
              value={question.text}
              onChange={(text) =>
                onChange(
                  produce(data, (draftState) => {
                    draftState[index].text = text;
                  })
                )
              }
            />
            {question.answers.map((answer, i) => (
              <InputTextarea
                key={i}
                label={`Opcion ${i + 1}`}
                value={answer.text}
                onChange={(text) =>
                  onChange(
                    produce(data, (draftState) => {
                      draftState[index].answers[i].text = text;
                    })
                  )
                }
              />
            ))}
            {question.answers.length < 4 && (
              <Button
                onClick={() =>
                  onChange(
                    produce(data, (drafState) => {
                      const answers = [...question.answers];
                      answers.push({
                        id: uid(),
                        text: '',
                        image: '',
                        explanation: '',
                        isCorrect: true
                      });
                      const newQuestion: Question = { ...question, answers: answers };
                      drafState.splice(index, 1, newQuestion);
                    })
                  )
                }
              >
                Agregar Opción
              </Button>
            )}
            <InputTextarea
              label="Explicación"
              value={question.explanation}
              onChange={(explanation) =>
                onChange(
                  produce(data, (draftState) => {
                    draftState[index].explanation = explanation;
                  })
                )
              }
            />
          </div>
        ))}
        {data.length < 4 && (
          <ButtonsContainer justifyContent="flex-end" padding="1em 0 0 0">
            <Button
              onClick={() =>
                onChange(
                  produce(data, (draftState) => {
                    draftState.push({
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
              Agregar Categoría
            </Button>
          </ButtonsContainer>
        )}
      </div>
    );
  }
}

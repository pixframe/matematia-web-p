import React from 'react';
import produce from 'immer';
import { InputTextarea, GridContainer, Button, ButtonsContainer } from '@calderaro/react-toolbox';
import uid from 'uid';
import { Question } from '../../../utils/types';
import { style } from 'typestyle';

export interface ColumnsInputProps {
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

export class ColumnsInput extends React.Component<ColumnsInputProps> {
  render() {
    const { data, onChange } = this.props;
    return (
      <div className={container}>
        <h3 className={title}>Columnas</h3>
        {data.map((question, index) => (
          <div key={question.id} className={questionContainer}>
            <GridContainer columns="1fr 1fr" gap="1em">
              <InputTextarea
                label="Columna 1"
                value={question.text}
                onChange={(text) =>
                  onChange(
                    produce(data, (draftState) => {
                      draftState[index].text = text;
                    })
                  )
                }
              />
              <InputTextarea
                label="Columna 2"
                value={question.answers[0].text}
                onChange={(text) =>
                  onChange(
                    produce(data, (draftState) => {
                      draftState[index].answers[0].text = text;
                    })
                  )
                }
              />
            </GridContainer>
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
            Agregar Relación
          </Button>
        </ButtonsContainer>
      </div>
    );
  }
}

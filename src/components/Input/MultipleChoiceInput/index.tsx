import React from 'react';
import produce from 'immer';
import { InputTextarea, Button } from '@calderaro/react-toolbox';
import { Question } from '../../../utils/types';
import InputSelect from '../InputSelect';
import { style } from 'typestyle';
import uid from 'uid';

export interface MultipleChoiceInputProps {
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

export class MultipleChoiceInput extends React.Component<MultipleChoiceInputProps> {
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

            <InputSelect
              id=""
              label="Respuesta correcta"
              value={answer.isCorrect}
              options={[
                { label: 'Correcta', value: true },
                { label: 'Incorrecta', value: false }
              ]}
              onChange={(isCorrect) =>
                onChange(
                  produce(data, (draftState) => {
                    draftState[0].answers[index].isCorrect = isCorrect;
                  })
                )
              }
            />
            {question.answers.length > 2 && (
              <Button
                onClick={() => {
                  const newQuestion = { ...question };
                  const answers = [...newQuestion.answers];
                  answers.splice(index, 1);
                  newQuestion.answers = answers;
                  const newData = [...data];
                  newData[0] = newQuestion;
                  onChange(newData);
                }}
              >
                Eliminar Opción
              </Button>
            )}
          </div>
        ))}
        {question.answers.length < 6 && (
          <Button
            onClick={() => {
              const newQuestion = { ...question };
              const answers = [
                ...newQuestion.answers,
                { id: uid(), text: '', image: '', explanation: '', isCorrect: false }
              ];
              newQuestion.answers = answers;
              const newData = [...data];
              newData[0] = newQuestion;
              onChange(newData);
            }}
          >
            Agregar Opción
          </Button>
        )}
      </div>
    );
  }
}

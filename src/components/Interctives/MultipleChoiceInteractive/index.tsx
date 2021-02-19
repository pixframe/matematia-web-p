import React from 'react';
import { style } from 'typestyle';
import { Question, Answer } from '../../../utils/types';
import Button from '../../UI/Button';

export interface MultipleChoiceInteractiveProps {
  data: Question[];
  onAnswer: (answers: [Question, Answer][]) => void;
}

interface MultipleChoiceInteractiveState {
  selectedAnswers: number[];
}

const buttons = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '3em 1em'
});

const validateDiv = style({
  display: 'flex',
  justifyContent: 'center'
});

export class MultipleChoiceInteractive extends React.Component<
  MultipleChoiceInteractiveProps,
  MultipleChoiceInteractiveState
> {
  state = {
    selectedAnswers: [] as number[]
  };

  render() {
    const { data, onAnswer } = this.props;
    const question = data[0] || {};
    return (
      <>
        <div className={buttons} data-testid="selectables">
          {question.answers.map((item, index) => (
            <Button
              key={item.id}
              data-test="button"
              onClick={() =>
                this.setState({
                  selectedAnswers: [index]
                })
              }
              label={item.text}
              minWidth="20%"
              backgroundColor={!this.state.selectedAnswers.includes(index) ? '#505271' : '#FF777C'}
              shadowColor={!this.state.selectedAnswers.includes(index) ? '#2B2B2B' : '#BF5559'}
            />
          ))}
        </div>
        {this.state.selectedAnswers.length > 0 ? (
          <div className={validateDiv}>
            <Button
              label="Validar"
              onClick={() =>
                onAnswer([[question, question.answers[this.state.selectedAnswers[0]]]])
              }
              minWidth="10%"
            />
          </div>
        ) : null}
      </>
    );
  }
}

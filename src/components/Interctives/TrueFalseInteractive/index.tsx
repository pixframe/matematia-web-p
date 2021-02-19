import React from 'react';
import { Question, Answer } from '../../../utils/types';
import Button from '../../UI/Button';
import { style } from 'typestyle';

export interface TrueFalseInteractiveProps {
  data: Question[];
  onAnswer: (answers: [Question, Answer][]) => void;
}
interface TrueFalseinteractiveState {
  selected: number;
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

export class TrueFalseInteractive extends React.Component<
  TrueFalseInteractiveProps,
  TrueFalseinteractiveState
> {
  state = {
    selected: -1
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
              label={item.text}
              onClick={() =>
                this.setState({
                  selected: index
                })
              }
              minWidth="20%"
              fontSize="1.4em"
              backgroundColor={this.state.selected !== index ? '#505271' : '#FF777C'}
              shadowColor={this.state.selected !== index ? '#2B2B2B' : '#BF5559'}
            />
          ))}
        </div>
        {this.state.selected >= 0 ? (
          <div className={validateDiv}>
            <Button
              label="Validar"
              onClick={() => onAnswer([[question, question.answers[this.state.selected]]])}
              minWidth="10%"
            />
          </div>
        ) : null}
      </>
    );
  }
}

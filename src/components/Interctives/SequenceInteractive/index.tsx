import React from 'react';
import { style } from 'typestyle';
import { Question, Answer } from '../../../utils/types';
import Button from '../../UI/Button';

export interface SequenceInteractiveProps {
  data: Question[];
  onAnswer: (answers: [Question, Answer][]) => void;
}

interface SequenceInteractiveState {
  selectedAnswers: number[];
  randomOrder: number[];
  isSet: boolean;
}

const buttons = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  padding: '3em 1em'
});

const selectable = style({
  display: 'flex',
  flexFlow: 'column',
  width: '25%',
  justifyContent: 'center',
  alignItems: 'center'
});

const validateDiv = style({
  display: 'flex',
  justifyContent: 'center'
});

const numberDiv = style({
  borderRadius: '50%',
  backgroundColor: '#FBB03B',
  width: '2em',
  height: '2em',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export default class SequenceInteractive extends React.Component<
  SequenceInteractiveProps,
  SequenceInteractiveState
> {
  state = {
    randomOrder: [],
    selectedAnswers: [] as number[],
    isSet: false
  };

  componentDidMount() {
    const currentOrder = Array(this.props.data[0].answers.length)
      .fill('')
      .map((_, index) => index);
    const newOrder: number[] = Array(this.props.data[0].answers.length).fill(0);
    newOrder.forEach((_, index) => {
      const randomIndex = Math.floor(Math.random() * currentOrder.length);
      newOrder[index] = currentOrder[randomIndex];
      currentOrder.splice(randomIndex, 1);
    });
    this.setState({
      randomOrder: newOrder,
      isSet: true
    });
  }

  SelectOption(index: number) {
    if (this.state.selectedAnswers.includes(index)) {
      const newSelectedAnswer = [...this.state.selectedAnswers];
      newSelectedAnswer.splice(this.state.selectedAnswers.indexOf(index), 1);
      this.setState({
        selectedAnswers: newSelectedAnswer
      });
    } else {
      this.setState({
        selectedAnswers: [...this.state.selectedAnswers, index]
      });
    }
  }

  render() {
    const { data, onAnswer } = this.props;
    const question = data[0] || {};
    return (
      <>
        {this.state.isSet && (
          <div className={buttons}>
            {question.answers.map((_, index) => (
              <div
                key={question.answers[this.state.randomOrder[index]].id}
                className={selectable}
                data-testid="selectables"
              >
                <Button
                  data-test="button"
                  onClick={() => this.SelectOption(index)}
                  label={question.answers[this.state.randomOrder[index]].text}
                  minWidth="80%"
                  backgroundColor={
                    !this.state.selectedAnswers.includes(index) ? '#505271' : '#FF777C'
                  }
                  shadowColor={!this.state.selectedAnswers.includes(index) ? '#2B2B2B' : '#BF5559'}
                />
                <div className={numberDiv} onClick={() => this.SelectOption(index)}>
                  {this.state.selectedAnswers.includes(index)
                    ? this.state.selectedAnswers.indexOf(index) + 1
                    : '_'}
                </div>
              </div>
            ))}
          </div>
        )}
        {this.state.selectedAnswers.length >= question.answers.length ? (
          <div className={validateDiv}>
            <Button
              label="Validar"
              onClick={() => {
                const finalOrder: number[] = Array(this.props.data[0].answers.length).fill(0);
                finalOrder.forEach((_, index) => {
                  finalOrder[index] = this.state.randomOrder[this.state.selectedAnswers[index]];
                });
                const answer: Answer = {
                  ...question.answers[0],
                  text: finalOrder.toString()
                };
                onAnswer([[question, answer]]);
              }}
              minWidth="10%"
            />
          </div>
        ) : null}
      </>
    );
  }
}

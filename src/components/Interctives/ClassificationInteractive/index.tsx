import React from 'react';
import { style } from 'typestyle';
import { Question, Answer } from '../../../utils/types';
import Button from '../../UI/Button';
import { colors, inactiveColor } from '../../../constants/colors';
import uid from 'uid';

interface ClassificationInteractiveProps {
  data: Question[];
  onAnswer: (answers: [Question, Answer][]) => void;
}

interface SelectableOptions {
  category: number;
  text: string;
  categorySetted: number;
}

interface ClassificationInteractiveState {
  isSet: boolean;
  currentCategory: number;
  options: SelectableOptions[];
}

const buttons = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  padding: '2em 1em 0em 1em'
});

const selections = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  padding: '0.5em 1em 0em 1em'
});

const validateDiv = style({
  display: 'flex',
  justifyContent: 'center'
});

class ClassificationInteractive extends React.Component<
  ClassificationInteractiveProps,
  ClassificationInteractiveState
> {
  state = {
    isSet: false,
    currentCategory: -1,
    options: [{ category: 0, text: '', categorySetted: 0 }]
  };

  componentDidMount() {
    const actualOptions = this.props.data
      .map((question, index) =>
        question.answers.map((answer) => {
          return { category: index, text: answer.text, categorySetted: -1 };
        })
      )
      .reduce((a, val) => a.concat(val));
    const mixableOptions = [...actualOptions];
    const mixedOptions: SelectableOptions[] = [];
    actualOptions.forEach(() => {
      const randomIndex = Math.floor(Math.random() * mixableOptions.length);
      mixedOptions.push(mixableOptions[randomIndex]);
      mixableOptions.splice(randomIndex, 1);
    });
    this.setState({
      isSet: true,
      options: mixedOptions
    });
  }

  SelectOption(index: number) {
    this.setState({
      currentCategory: index
    });
  }

  isCorrectAnswer() {
    let isCorrect = true;
    this.state.options.forEach((option) => {
      if (option.category !== option.categorySetted) {
        isCorrect = false;
      }
    });
    return isCorrect;
  }

  render() {
    const { data, onAnswer } = this.props;
    return (
      <>
        {this.state.isSet && (
          <div className={buttons} data-testid="sections">
            {data.map((question, index) => (
              <Button
                key={question.id}
                data-test="button"
                onClick={() => this.SelectOption(index)}
                label={question.text}
                minWidth="20%"
                backgroundColor={colors[index].primary}
                shadowColor={colors[index].shadow}
              />
            ))}
          </div>
        )}
        {this.state.isSet && (
          <div className={selections} data-testid="selections">
            {this.state.options.map((option, index) => (
              <Button
                key={`option${option.text}$${index}`}
                data-test="button"
                onClick={() => {
                  const newOption = option;
                  newOption.categorySetted = this.state.currentCategory;
                  const options = [...this.state.options];
                  options.splice(index, 1, newOption);
                  this.setState({
                    options
                  });
                }}
                label={option.text}
                minWidth="15%"
                backgroundColor={
                  option.categorySetted >= 0
                    ? colors[option.categorySetted].primary
                    : inactiveColor.primary
                }
                shadowColor={
                  option.categorySetted >= 0
                    ? colors[option.categorySetted].shadow
                    : inactiveColor.shadow
                }
              />
            ))}
          </div>
        )}
        {!this.state.options.find((item) => item.categorySetted === -1) ? (
          <div className={validateDiv}>
            <Button
              label="Validar"
              onClick={() =>
                onAnswer([
                  [
                    data[0],
                    {
                      id: uid(),
                      text: 'answer',
                      image: '',
                      explanation: '',
                      isCorrect: this.isCorrectAnswer()
                    }
                  ]
                ])
              }
              minWidth="10%"
            />
          </div>
        ) : null}
      </>
    );
  }
}

export default ClassificationInteractive;

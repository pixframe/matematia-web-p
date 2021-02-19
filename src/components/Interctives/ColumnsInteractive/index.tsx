import React, { useState, useEffect } from 'react';
import { Question, Answer } from '../../../utils/types';
import { style } from 'typestyle';
import Button from '../../UI/Button';
import { colors } from '../../../constants/colors';

interface ColumnsInteractiveProps {
  data: Question[];
  onAnswer: (answers: [Question, Answer][]) => void;
}

const column = style({
  display: 'flex',
  flexFlow: 'column',
  margin: '3rem 0',
  justifyContent: 'space-around',
  width: '100%'
});

const validateDiv = style({
  display: 'flex',
  justifyContent: 'center'
});

const optionsDiv = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between'
});

const ColumnsInteractive: React.FC<ColumnsInteractiveProps> = ({ data, onAnswer }) => {
  const questions = data || {};
  const [numbers, setNumbers] = useState([[0, 0]]);
  const [selected, setSelected] = useState(-1);
  const [pick, setPick] = useState([[0, 0]]);

  useEffect(() => {
    const arrayOfQuestions: number[] = [];
    const arrayOfAnswers: number[] = [];
    const picks: [number, number][] = [];
    for (let i = 0; i < questions.length; i++) {
      arrayOfQuestions.push(i);
      arrayOfAnswers.push(i);
    }
    const finalNumbers = [];
    for (let i = 0; i < questions.length; i++) {
      const firstColumn = Math.floor(Math.random() * arrayOfQuestions.length);
      const secondColumn = Math.floor(Math.random() * arrayOfAnswers.length);
      finalNumbers.push([arrayOfQuestions[firstColumn], arrayOfAnswers[secondColumn]]);
      picks.push([i, -1]);
      arrayOfQuestions.splice(firstColumn, 1);
      arrayOfAnswers.splice(secondColumn, 1);
    }
    setPick(picks);
    setNumbers(finalNumbers);
  }, [questions]);

  const answerNow = () => {
    const answers: [Question, Answer][] = [];
    questions.forEach((question, index) => {
      answers.push([
        question,
        {
          id: 'user',
          text: questions[pick[index][1]].answers[0].text,
          image: '',
          explanation: '',
          isCorrect: questions[pick[index][1]].answers[0].text === question.answers[0].text
        }
      ]);
    });
    onAnswer(answers);
  };

  const hasBeenAnswer: () => boolean = () => {
    let answer = true;
    pick.forEach((el) => {
      if (el[1] < 0) {
        answer = false;
      }
    });
    return answer;
  };

  const selectNumber = (num: number, selected: number) => {
    if (num < 0) {
      return;
    }
    const picks = [...pick];
    picks[num][1] = selected;
    setPick(picks);
  };

  const colorNumber = (currentValue: number) => {
    const numIndex = numbers.findIndex((nums) => nums[0] === pick[currentValue][1]);

    return colors[numIndex];
  };

  return (
    <>
      <div className={optionsDiv}>
        {numbers.map((value, index) => {
          return (
            <div key={value[0]} className={column} data-testid="column">
              <Button
                backgroundColor={colors[index].primary}
                shadowColor={colors[index].shadow}
                label={questions[value[0]].text}
                onClick={() => setSelected(pick[value[0]][0])}
                minWidth="20%"
              />
              <Button
                label={questions[value[1]].answers[0].text}
                backgroundColor={pick[value[1]][1] >= 0 ? colorNumber(value[1]).primary : '#505271'}
                shadowColor={pick[value[1]][1] >= 0 ? colorNumber(value[1]).shadow : '#2B2B2B'}
                onClick={() => selectNumber(value[1], selected)}
                minWidth="20%"
              />
            </div>
          );
        })}
      </div>
      {hasBeenAnswer() ? (
        <div className={validateDiv}>
          <Button label="Validar" onClick={answerNow} minWidth="10%" />
        </div>
      ) : null}
    </>
  );
};

export default ColumnsInteractive;

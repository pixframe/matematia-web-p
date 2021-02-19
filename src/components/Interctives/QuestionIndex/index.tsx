import React from 'react';
import { style } from 'typestyle';

interface QuestionIndexProps {
  numberOfQuestions: number;
  currentQuestion: number;
}

const indexDiv = style({
  color: 'white',
  fontSize: '2.6em',
  padding: '0.5em',
  backgroundColor: '#32659D',
  minWidth: '6em',
  textAlign: 'center'
});

const QuestionIndex: React.FC<QuestionIndexProps> = ({ numberOfQuestions, currentQuestion }) => {
  return <div className={indexDiv}>{`${currentQuestion} DE ${numberOfQuestions}`}</div>;
};

export default QuestionIndex;

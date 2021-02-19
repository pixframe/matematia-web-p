import React from 'react';
import { style } from 'typestyle';

const container = style({
  display: 'flex',
  overflow: 'hidden',
  padding: '2em'
});

const text = style({
  color: 'white',
  fontSize: '1.8em'
});

interface QuestionProps {
  question: string;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className={container}>
      <span data-testid="component-question" className={text}>
        {question}
      </span>
    </div>
  );
};

export default Question;

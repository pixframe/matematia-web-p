import React from 'react';
import '@testing-library/react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import Question from './index';

describe('Question Component', () => {
  const setup = (props = { question: 'questions' }) => {
    const setupProps = { ...props };
    render(<Question {...setupProps} />);
  };

  test('should render question', () => {
    setup();
    const question = screen.findByTestId('component-question');
    expect(question).toBeTruthy();
  });

  test('should question should render text past in props', () => {
    const questionData = { question: 'question' };
    setup(questionData);
    const question = screen.getByTestId('component-question');
    expect(question.textContent).toBe(questionData.question);
  });
});

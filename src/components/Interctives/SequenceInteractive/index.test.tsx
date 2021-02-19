import React from 'react';
import '@testing-library/react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Question } from '../../../utils/types';

import ClassificationInteractive from './index';

const baseQuestions: Question[] = [
  {
    answers: [
      {
        explanation: '',
        id: '0qvv17bvzvcxxnh',
        image: '',
        isCorrect: true,
        text: 'primer término'
      },
      {
        explanation: '',
        id: '0qvv17bvzvcxxnhasd',
        image: '',
        isCorrect: true,
        text: 'primer términos'
      },
      {
        explanation: '',
        id: '0qvv17bvsaxnh',
        image: '',
        isCorrect: true,
        text: '4 término'
      },
      {
        explanation: '',
        id: '0qvv17bsaddsavsaxnh',
        image: '',
        isCorrect: true,
        text: '6 término'
      }
    ],
    explanation: '',
    id: 'odztyz<vcxztiwaum',
    image: '',
    text: 'a2'
  }
];

const mount = () => {
  render(<ClassificationInteractive data={baseQuestions} onAnswer={() => []} />);
};

test('Classification interactive render correctly', () => {
  mount();
});

test('Classification interactive render correctly question', () => {
  mount();
  const question = screen.getByTestId('component-question');
  expect(question.textContent).toEqual(baseQuestions[0].text);
});

test('Clasification interactive render correct amount of classes', () => {
  mount();
  const classes = screen.getAllByTestId('selectables');
  expect(classes.length).toEqual(baseQuestions[0].answers.length);
});

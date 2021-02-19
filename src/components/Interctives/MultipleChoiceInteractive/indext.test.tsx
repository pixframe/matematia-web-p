import React from 'react';
import '@testing-library/react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Question } from '../../../utils/types';

import { MultipleChoiceInteractive } from './index';

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
  render(<MultipleChoiceInteractive data={baseQuestions} onAnswer={() => []} />);
};

test('Multiple choice interactive render correctly', () => {
  mount();
});

test('Multiple choice interactive render correctly question', () => {
  mount();
  const question = screen.getByTestId('component-question');
  expect(question.textContent).toEqual(baseQuestions[0].text);
});

test('Multiple choice interactive render correct amount of options', () => {
  mount();
  const classes = screen.getByTestId('selectables');
  expect(classes.childNodes.length).toEqual(baseQuestions[0].answers.length);
});

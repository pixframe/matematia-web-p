import React from 'react';
import '@testing-library/react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Question } from '../../../utils/types';

import ClassificationInteractive from './index';

const questionText = 'Pregunta que se hace';

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
      }
    ],
    explanation: '',
    id: 'odztyz<vcxztiwaum',
    image: '',
    text: 'a2'
  },
  {
    answers: [
      {
        explanation: '',
        id: '0qvv17bzvcxvxnh',
        image: '',
        isCorrect: true,
        text: '2 término'
      },
      {
        explanation: '',
        id: '0qvv17bzvcxvxnhsad',
        image: '',
        isCorrect: true,
        text: '2 términos'
      }
    ],
    explanation: '',
    id: 'odztytizxvcwaum',
    image: '',
    text: 'a3'
  },
  {
    answers: [
      {
        explanation: '',
        id: '0qvv17asdxcvbvxnh',
        image: '',
        isCorrect: true,
        text: '3 término'
      }
    ],
    explanation: '',
    id: 'odztytixczvwaum',
    image: '',
    text: 'a4'
  },
  {
    answers: [
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
    id: 'odztytiwausm',
    image: '',
    text: 'a5'
  }
];

const mount = () => {
  render(
    <ClassificationInteractive text={questionText} data={baseQuestions} onAnswer={() => []} />
  );
};

test('Classification interactive render correctly', () => {
  mount();
});

test('Classification interactive render correctly question', () => {
  mount();
  const question = screen.getByTestId('component-question');
  expect(question.textContent).toEqual(questionText);
});

test('Clasification interactive render correct amount of classes', () => {
  mount();
  const classes = screen.getByTestId('sections');
  expect(classes.childNodes.length).toEqual(baseQuestions.length);
});

test('Clasification interactive render correct amount of selectables', () => {
  mount();
  const classes = screen.getByTestId('selections');
  let amount = 0;
  baseQuestions.forEach((question) => {
    amount += question.answers.length;
  });
  expect(classes.childNodes.length).toEqual(amount);
});

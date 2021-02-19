import React from 'react';
import '@testing-library/react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Question } from '../../../utils/types';

import DragAndDropInteractive from './index';

const questionText = 'Pregunta que se hace';

const baseQuestions: Question[] = [
  {
    answers: [
      {
        explanation: '',
        id: '0qvv17bvxnh',
        image: '',
        isCorrect: true,
        text: 'primer término'
      }
    ],
    explanation: '',
    id: 'odztytiwaum',
    image: '',
    text: 'a2'
  },
  {
    answers: [
      {
        explanation: '',
        id: '0qvv17bvxnh',
        image: '',
        isCorrect: true,
        text: '2 término'
      }
    ],
    explanation: '',
    id: 'odztytiwaum',
    image: '',
    text: 'a3'
  },
  {
    answers: [
      {
        explanation: '',
        id: '0qvv17bvxnh',
        image: '',
        isCorrect: true,
        text: '3 término'
      }
    ],
    explanation: '',
    id: 'odztytiwaum',
    image: '',
    text: 'a4'
  },
  {
    answers: [
      {
        explanation: '',
        id: '0qvv17bvxnh',
        image: '',
        isCorrect: true,
        text: '4 término'
      }
    ],
    explanation: '',
    id: 'odztytiwaum',
    image: '',
    text: 'a5'
  },
  {
    answers: [
      {
        explanation: '',
        id: '0qvv17bvxnh',
        image: '',
        isCorrect: true,
        text: '5 término'
      }
    ],
    explanation: '',
    id: 'odztytiwaum',
    image: '',
    text: 'a6'
  }
];

const mount = () => {
  render(<DragAndDropInteractive text={questionText} data={baseQuestions} onAnswer={() => []} />);
};

test('Drag and Drop interactive render correctly', () => {
  mount();
});

test('Drag and Drop interactive render correctly question', () => {
  mount();
  const question = screen.getByTestId('component-question');
  expect(question.textContent).toEqual(questionText);
});

test('Drag and Drop interactive render correct amount of Drop Zones', () => {
  mount();
  const columns = screen.getAllByTestId('dropZone');
  expect(columns.length).toEqual(baseQuestions.length);
});

test('Drag and Drop interactive render correct amount of buttons', () => {
  mount();
  const columns = screen.getAllByTestId('dragElement');
  expect(columns.length).toEqual(baseQuestions.length);
});

import React from 'react';
import '@testing-library/react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Question } from '../../../utils/types';

import MultipleQuestionInteractive from './index';

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
    id: 'odztytiwaumss',
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
    id: 'odztytiwauasdm',
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
    id: 'odztytiwauadsm',
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
    id: 'odztytiwaaddaum',
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
    id: 'odztytiwaadsasum',
    image: '',
    text: 'a6'
  }
];

const mount = () => {
  render(
    <MultipleQuestionInteractive text={questionText} data={baseQuestions} onAnswer={() => []} />
  );
};

test('Multiple Question interactive render correctly', () => {
  mount();
});

test('Multiple Question render correctly question', () => {
  mount();
  const question = screen.getByTestId('component-question');
  expect(question.textContent).toEqual(questionText);
});

test('Multiple Question render correct amount of questions', () => {
  mount();
  const answerBoxs = screen.getAllByTestId('questions');
  expect(answerBoxs.length).toEqual(baseQuestions.length);
});

test('Mutiple Question render correct question', () => {
  mount();
  const answerBoxs = screen.getAllByTestId('questions');
  answerBoxs.forEach((box, index) => {
    expect(box.firstChild?.textContent).toEqual(baseQuestions[index].text);
  });
});

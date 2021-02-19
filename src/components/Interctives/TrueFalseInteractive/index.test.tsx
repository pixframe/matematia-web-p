import React from 'react';
import '@testing-library/react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Question } from '../../../utils/types';

import { TrueFalseInteractive } from './index';

const baseQuestion: Question = {
  answers: [
    {
      explanation: '',
      id: '76fwjzq4tz5',
      image: '',
      isCorrect: true,
      text: 'Verdadero'
    },
    {
      explanation: '',
      id: 'hxfu6hmwdko',
      image: '',
      isCorrect: false,
      text: 'Falso'
    }
  ],
  explanation: 'Esto es verdadero',
  id: '00zkefviuzp',
  image: '',
  text: 'un apotema es la distancia más corta entre el centro del pentágono a uno de sus lados.'
};

const mount = () => {
  render(<TrueFalseInteractive data={[baseQuestion]} onAnswer={() => []} />);
};

test('True or false interactive render correctly', () => {
  mount();
});

test('True or false interactive render correctly question', () => {
  mount();
  const question = screen.getByTestId('component-question');
  expect(question.textContent).toEqual(baseQuestion.text);
});

test('True or false interactive render correct amount of buttons', () => {
  mount();
  const buttons = screen.getByTestId('selectables');
  expect(buttons.childNodes.length).toEqual(baseQuestion.answers.length);
});

test('True or false interactive true button is correct', () => {
  mount();
  const buttons = screen.getByTestId('selectables');
  expect(buttons.childNodes[0].textContent).toEqual('Verdadero');
});

test('True or false interactive false button is correct', () => {
  mount();
  const buttons = screen.getByTestId('selectables');
  expect(buttons.childNodes[1].textContent).toEqual('Falso');
});

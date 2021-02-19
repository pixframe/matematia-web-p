import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../test/testUtil';

import AnswerModal from './index';
import Modal from '../../Modal';
import Header from '../../Modal/Header';

describe('Answer Modal', () => {
  const setup = ({
    onClose = () => {},
    open = false,
    isCorrect = false,
    userAnswer = '',
    explanation = ''
  }) => {
    return shallow(
      <AnswerModal
        onClose={onClose}
        open={open}
        isCorrect={isCorrect}
        userAnswer={userAnswer}
        explanation={explanation}
      />
    );
  };

  test('should render without errors', () => {
    const wrapper = setup({});
    const answerModal = findByTestAttr(wrapper, 'answer-modal');
    expect(answerModal.length).toBe(1);
  });

  test('should render incorrect if porps isCorrect is false', () => {
    const wrapper = setup({ isCorrect: false });
    const modalComponent = wrapper.find(Modal);
    expect(modalComponent.props().title).toContain('Incorrect');
  });

  test('should render correct if porps isCorrect is true', () => {
    const wrapper = setup({ isCorrect: true });
    const modalComponent = wrapper.find(Modal);
    expect(modalComponent.props().title).toContain('Correct');
  });

  test('should render explanation', () => {
    const wrapper = setup({ isCorrect: true, explanation: 'explanation' });
    const answerExplanation = findByTestAttr(wrapper, 'answer-explanation');
    expect(answerExplanation.text()).toBe('explanation');
  });

  test('should render a next button if answer is correct', () => {
    const wrapper = setup({ isCorrect: true });
    const nextButton = findByTestAttr(wrapper, 'next-button');
    expect(nextButton.length).toBe(1);
  });

  test('should not render a next button if answer is incorrect', () => {
    const wrapper = setup({ isCorrect: false });
    const nextButton = findByTestAttr(wrapper, 'next-button');
    expect(nextButton.length).toBe(0);
  });
});

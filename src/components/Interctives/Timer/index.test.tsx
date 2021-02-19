import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../test/testUtil';

import Timmer from './index';

describe('Timer', () => {
  const setup = (props = { timeInSeconds: 0, timeInMinutes: 0 }) => {
    return shallow(
      <Timmer timeInSeconds={props.timeInSeconds} timeInMinutes={props.timeInMinutes} />
    );
  };

  test('should render timer without error', () => {
    const wrapper = setup();
    const timer = findByTestAttr(wrapper, 'component-timer');
    expect(timer.length).toBe(1);
  });

  test('should render time without error', () => {
    const wrapper = setup();
    const timerDisplay = findByTestAttr(wrapper, 'display-timer');
    expect(timerDisplay.length).toBe(1);
  });

  test('should render time correctly', () => {
    const wrapper = setup({ timeInSeconds: 5, timeInMinutes: 5 });
    const timerDisplay = findByTestAttr(wrapper, 'display-timer');
    expect(timerDisplay.length).toBe(1);

    expect(timerDisplay.text()).toBe('05:05');
  });
});

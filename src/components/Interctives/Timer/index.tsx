import React from 'react';
import moment from 'moment';

interface Props {
  estimatedTime: number;
}

const AnswerModal: React.FC<Props> = ({ estimatedTime }) => {
  const duration = moment.duration(estimatedTime, 'seconds');
  const formatted = moment.utc(duration.as('milliseconds')).format('hh:mm:ss');

  return (
    <div data-test="component-timer">
      <span data-test="display-timer">{formatted}</span>
    </div>
  );
};

export default AnswerModal;

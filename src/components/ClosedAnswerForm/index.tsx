import React from 'react';
import { FormHandlerChildrenProps } from '@calderaro/react-toolbox';
import { Exercise } from '../../utils/types';
import { ClosedAnswerInput } from '../Input/CloseAnswerInput';
import { TrueFalseInput } from '../Input/TrueFalseInput';
import { MultipleChoiceInput } from '../Input/MultipleChoiceInput';
import { ColumnsInput } from '../Input/ColumnsInput';
import { SequenceInput } from '../Input/SeqeunceInput';
import { ClassificationInput } from '../Input/ClassificationInput';
import { MultipleQuestionsInput } from '../Input/MultipleQuestionsInput';
import { DragAndDropInput } from '../Input/DragAndDropInput';

const ClosedAnswerForm: React.FC<FormHandlerChildrenProps<Exercise>> = ({ state, onChange }) => {
  return (
    <>
      <br />
      <br />
      <br />

      {state.data.type === 'closedAnswer' && state.data.questions.length ? (
        <ClosedAnswerInput
          data={state.data.questions}
          onChange={(value) => onChange(value, 'questions')}
        />
      ) : null}

      {state.data.type === 'trueFalse' && state.data.questions.length ? (
        <TrueFalseInput
          data={state.data.questions}
          onChange={(value) => onChange(value, 'questions')}
        />
      ) : null}

      {state.data.type === 'multipleChoice' && state.data.questions.length ? (
        <MultipleChoiceInput
          data={state.data.questions}
          onChange={(value) => onChange(value, 'questions')}
        />
      ) : null}

      {state.data.type === 'columns' && state.data.questions.length ? (
        <ColumnsInput
          data={state.data.questions}
          onChange={(value) => onChange(value, 'questions')}
        />
      ) : null}
      {state.data.type === 'sequence' && state.data.questions.length ? (
        <SequenceInput
          data={state.data.questions}
          onChange={(value) => onChange(value, 'questions')}
        />
      ) : null}
      {state.data.type === 'classification' && state.data.questions.length ? (
        <ClassificationInput
          data={state.data.questions}
          onChange={(value) => onChange(value, 'questions')}
        />
      ) : null}
      {state.data.type === 'multipleQuestions' && state.data.questions.length ? (
        <MultipleQuestionsInput
          data={state.data.questions}
          onChange={(value) => onChange(value, 'questions')}
        />
      ) : null}
      {state.data.type === 'draganddrop' && state.data.questions.length ? (
        <DragAndDropInput
          data={state.data.questions}
          onChange={(value) => onChange(value, 'questions')}
        />
      ) : null}
    </>
  );
};

export default ClosedAnswerForm;

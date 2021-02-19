import React, { useState, useEffect } from 'react';
import { Question, Answer } from '../../../utils/types';
import { style } from 'typestyle';
import Button from '../../UI/Button';
import Dragabble from '../../UI/Draggable';

interface DragAndDropInteractiveProps {
  data: Question[];
  onAnswer: (answers: [Question, Answer][]) => void;
}

const column = style({
  display: 'flex',
  flexFlow: 'column',
  margin: '2em 0 0 0',
  justifyContent: 'center',
  width: '100%',
  textAlign: 'center',
  alignItems: 'center'
});

const validateDiv = style({
  display: 'flex',
  justifyContent: 'center'
});

const dragzoneDiv = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between'
});

const dropzoneDiv = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between'
});

const dropzoneTitle = style({
  fontSize: '1.2em',
  color: 'white',
  marginBottom: '0.6em'
});

const DragAndDropInteractive: React.FC<DragAndDropInteractiveProps> = ({ data, onAnswer }) => {
  const questions = data || {};
  const [numbers, setNumbers] = useState([[0, 0]]);
  const [selected, setSelected] = useState(-1);
  const [dropped, setDropped] = useState([0, null]);

  useEffect(() => {
    const arrayOfQuestions: number[] = [];
    const arrayOfAnswers: number[] = [];
    const dropped: number | null[] = [];
    for (let i = 0; i < questions.length; i++) {
      arrayOfQuestions.push(i);
      arrayOfAnswers.push(i);
      dropped.push(null);
    }
    const finalNumbers = [];
    for (let i = 0; i < questions.length; i++) {
      const firstColumn = Math.floor(Math.random() * arrayOfQuestions.length);
      const secondColumn = Math.floor(Math.random() * arrayOfAnswers.length);
      finalNumbers.push([arrayOfQuestions[firstColumn], arrayOfAnswers[secondColumn]]);
      arrayOfQuestions.splice(firstColumn, 1);
      arrayOfAnswers.splice(secondColumn, 1);
    }
    setNumbers(finalNumbers);
    setDropped(dropped);
  }, [questions]);

  const answerNow = () => {
    const answers: [Question, Answer][] = [];
    numbers.forEach((number, index) => {
      answers.push([
        questions[number[0]],
        {
          id: 'user',
          text: questions[dropped[index] as number].answers[0].text,
          image: '',
          explanation: '',
          isCorrect:
            questions[dropped[index] as number].answers[0].text ===
            questions[number[0]].answers[0].text
        }
      ]);
    });
    onAnswer(answers);
  };

  const hasBeenAnswer: () => boolean = () => {
    return !dropped.includes(null);
  };

  const onEnter = (selectedPos: number) => {
    setSelected(selectedPos);
  };

  const onDrop = (position: number) => {
    const values = [...dropped];
    if (values.includes(position)) {
      const index = values.findIndex((val) => val === position);
      values[index] = null;
    }

    if (selected === -1) {
      setDropped(values);
      return;
    }

    values[selected] = position;
    setDropped(values);
    setSelected(-1);
  };

  const draggable = (value: number, width = '70%') => {
    return (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Dragabble
          label={questions[value].answers[0].text}
          onDragEnd={() => onDrop(value)}
          minWidth={width}
          id={`dragabble_${questions[value].answers[0].text}`}
        />
      </div>
    );
  };

  return (
    <>
      <div className={dropzoneDiv}>
        {numbers.map((value, index) => {
          return (
            <div key={value[0]} className={column} data-testid="column">
              <h1 className={dropzoneTitle} onDragEnter={() => onEnter(-1)}>
                {questions[value[0]].text}
              </h1>
              <div
                style={{
                  borderStyle: 'dashed',
                  borderWidth: '0.2em',
                  borderColor: 'white',
                  width: '80%',
                  height: '4em'
                }}
                onDragEnter={() => onEnter(index)}
                id={`dropzone_${value[0]}`}
                data-testid="dropZone"
              >
                {dropped[index] != null ? draggable(dropped[index] as number, '90%') : null}
              </div>
              <div onDragEnter={() => onEnter(-1)}></div>
            </div>
          );
        })}
      </div>
      <div className={dragzoneDiv} onDragEnter={() => onEnter(-1)}>
        {numbers.map(
          (value) =>
            !dropped.includes(value[1]) && (
              <div key={value[0]} className={column} data-testid="dragElement">
                {draggable(value[1])}
              </div>
            )
        )}
        {numbers.map(
          (value) => dropped.includes(value[1]) && <div key={value[0]} className={column}></div>
        )}
      </div>
      {hasBeenAnswer() ? (
        <div className={validateDiv}>
          <Button label="Validar" onClick={answerNow} minWidth="10%" />
        </div>
      ) : null}
    </>
  );
};

export default DragAndDropInteractive;

import React from 'react';
import InputSelect from '../Input/InputSelect';
import styles from './styles.module.css';
import { FormHandlerChildrenProps, GridContainer, InputTextarea } from '@calderaro/react-toolbox';
import { ExerciseTypeNames, Exercise, HelpType } from '../../utils/types';
import ClosedAnswerForm from '../ClosedAnswerForm';
import uid from 'uid';
import { difficultyOptions } from '../../constants/difficulties';
import { modesOptions } from '../../constants/modes';
import { skillOptions } from '../../constants/skills';
import getStorageUrl from '../../utils/storage';
import InputText from '../Input/InputText';
import InputImage from '../Input/InputImage';
import InputCheckbox from '../Input/InputCheckbox';

const closedAnswerInitialState = [
  {
    id: uid(),
    text: '',
    explanation: '',
    image: '',
    answers: [
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      }
    ],
    skills: []
  }
];

const multipleChoiceInitialState = [
  {
    id: uid(),
    text: '',
    explanation: '',
    image: '',
    answers: [
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      },
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: false
      }
    ],
    skills: []
  }
];

const trueFalseInitialState = [
  {
    id: uid(),
    text: '',
    explanation: '',
    image: '',
    answers: [
      {
        id: uid(),
        text: 'Verdadero',
        image: '',
        explanation: '',
        isCorrect: true
      },
      {
        id: uid(),
        text: 'Falso',
        image: '',
        explanation: '',
        isCorrect: false
      }
    ],
    skills: []
  }
];

const columnsInitialState = [
  {
    id: uid(),
    text: '',
    explanation: '',
    image: '',
    answers: [
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      }
    ],
    skills: []
  }
];

const sequenceInitialState = [
  {
    id: uid(),
    text: '',
    explanation: '',
    image: '',
    answers: [
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      },
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      },
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      }
    ],
    skills: []
  }
];

const classificationInitialState = [
  {
    id: uid(),
    text: '',
    explanation: '',
    image: '',
    answers: [
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      }
    ]
  },
  {
    id: uid(),
    text: '',
    explanation: '',
    image: '',
    answers: [
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      }
    ],
    skills: []
  }
];

const multipleQuestionsInitialState = [
  {
    id: uid(),
    text: '',
    explanation: '',
    image: '',
    answers: [
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      }
    ]
  },
  {
    id: uid(),
    text: '',
    explanation: '',
    image: '',
    answers: [
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      }
    ]
  }
];

const dragAndDropInitialState = [
  {
    id: uid(),
    text: '',
    explanation: '',
    image: '',
    answers: [
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      }
    ],
    skills: []
  },
  {
    id: uid(),
    text: '',
    explanation: '',
    image: '',
    answers: [
      {
        id: uid(),
        text: '',
        image: '',
        explanation: '',
        isCorrect: true
      }
    ],
    skills: []
  }
];

const ExerciseForm: React.FC<FormHandlerChildrenProps<Exercise>> = (formHandlerProps) => {
  const { state, onChange } = formHandlerProps;
  const { data } = state;

  return (
    <div className={styles.container}>
      <GridContainer columns="1fr 1fr 1fr 1fr 1fr" gap="1em">
        <InputSelect<ExerciseTypeNames>
          id="type"
          label="Tipo de ejercicio"
          value={data.type}
          onChange={(value) => {
            onChange(value, 'type');

            if (value === 'closedAnswer') {
              onChange(closedAnswerInitialState, 'questions');
            }
            if (value === 'trueFalse') {
              onChange(trueFalseInitialState, 'questions');
            }
            if (value === 'multipleChoice') {
              onChange(multipleChoiceInitialState, 'questions');
            }
            if (value === 'columns') {
              onChange(columnsInitialState, 'questions');
            }
            if (value === 'sequence') {
              onChange(sequenceInitialState, 'questions');
            }
            if (value === 'classification') {
              onChange(classificationInitialState, 'questions');
            }
            if (value === 'multipleQuestions') {
              onChange(multipleQuestionsInitialState, 'questions');
            }
            if (value === 'draganddrop') {
              onChange(dragAndDropInitialState, 'questions');
            }
          }}
          options={[
            { label: 'Opción múltiple', value: 'multipleChoice' },
            { label: 'Respuesta cerrada', value: 'closedAnswer' },
            { label: 'Columnas', value: 'columns' },
            { label: 'Verdadero o Falso', value: 'trueFalse' },
            { label: 'Secuencia', value: 'sequence' },
            { label: 'Clasificación', value: 'classification' },
            { label: 'Preguntas Multiples', value: 'multipleQuestions' },
            { label: 'Drag & Drop', value: 'draganddrop' }
          ]}
        />
        <InputText
          id="estimatedTime"
          label="Tiempo estimado (Segundos)"
          value={state.data.estimatedTime}
          onChange={(value) => onChange(Number(value), 'estimatedTime')}
        />
        <InputSelect
          id="isTimeLimited"
          value={state.data.isTimeLimited}
          label="Tiempo limitado"
          onChange={(value) => onChange(value, 'isTimeLimited')}
          options={[
            { label: 'Sí', value: true },
            { label: 'No', value: false }
          ]}
        />
        <InputSelect
          id="difficulty"
          value={state.data.difficulty}
          label="Dificultad"
          onChange={(value) => onChange(value, 'difficulty')}
          options={difficultyOptions}
        />
        <InputSelect
          id="mode"
          value={state.data.mode}
          label="Modo"
          onChange={(value) => onChange(value, 'mode')}
          options={modesOptions}
        />
      </GridContainer>

      <h1>Habilidades</h1>
      <GridContainer columns="1fr 1fr 1fr 1fr 1fr" gap="1em">
        {skillOptions.map((option) => (
          <InputCheckbox
            key={option.value}
            id={option.value}
            label={option.label}
            value={state.data.skills.includes(option.value)}
            onChange={(value) => {
              const skills = [...data.skills];
              if (value.value) {
                skills.push(option.value);
              } else {
                const index = skills.findIndex((item) => item === option.value);
                skills.splice(index, 1);
              }
              onChange(skills, 'skills');
            }}
          />
        ))}
      </GridContainer>

      <h1>Ayuda</h1>
      <GridContainer columns="1fr 1fr" gap="1em">
        <InputSelect<HelpType>
          id="helpType"
          label="Tipo de ayuda"
          value={data.help.type}
          onChange={(value) => {
            const help = { ...data.help };
            help.type = value;
            onChange(help, 'help');
          }}
          options={[
            { label: 'Texto', value: 'text' },
            { label: 'Imagen', value: 'image' },
            { label: 'Link', value: 'link' },
            { label: 'Video', value: 'video' }
          ]}
        />
      </GridContainer>
      <InputText
        id="helptext"
        label="Tetxo Ayuda"
        value={state.data.help?.text}
        onChange={(value) => {
          const help = { ...data.help, text: value };
          onChange(help, 'help');
        }}
      />
      {data.help.type === 'image' && (
        <InputImage
          label="Imagen Ayuda"
          value={data.help.image}
          parser={getStorageUrl}
          onChange={(value) => {
            const newHelp = { ...data.help, image: value };
            onChange(newHelp, 'help');
          }}
        />
      )}
      {(data.help.type === 'video' || data.help.type === 'link') && (
        <InputText
          id="helptext"
          label={data.help.type === 'link' ? 'Vínculo Ayuda' : 'Vínculo Video'}
          value={state.data.help?.url}
          onChange={(value) => {
            const help = { ...data.help, url: value };
            help.text = value;
            onChange(help, 'help');
          }}
        />
      )}

      <h1>Ejercicio</h1>
      <InputTextarea
        id="explanation"
        label="Justificación general"
        value={state.data.explanation}
        onChange={(value) => onChange(value, 'explanation')}
      />

      {(data.type === 'classification' ||
        data.type === 'columns' ||
        data.type === 'multipleQuestions' ||
        data.type === 'draganddrop') && (
        <InputTextarea
          id="text"
          label={data.type === 'multipleQuestions' ? 'Reactivo' : 'Pregunta'}
          value={state.data.text}
          onChange={(value) => onChange(value, 'text')}
        />
      )}
      <InputImage
        label="Imagen del ejercicio"
        value={data.image}
        onChange={(value) => onChange(value, 'image')}
        parser={getStorageUrl}
      />
      <ClosedAnswerForm {...formHandlerProps} />
    </div>
  );
};

export default ExerciseForm;

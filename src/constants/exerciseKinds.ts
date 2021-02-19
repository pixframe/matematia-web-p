import { ExerciseTypeNames } from '../utils/types';
import closed from '../assets/images/icons/preguntas/abierta.svg';
import columns from '../assets/images/icons/preguntas/columnas.svg';
import trueFalse from '../assets/images/icons/preguntas/verdaderofalso.svg';
import multiple from '../assets/images/icons/preguntas/multiple.svg';
import sequence from '../assets/images/icons/preguntas/secuencia.svg';
import classification from '../assets/images/icons/preguntas/clasificacion.svg';
import multipleQuestions from '../assets/images/icons/preguntas/multiplespreguntas.svg';
import dragdrop from '../assets/images/icons/preguntas/draganddrop.svg';

export const exercisesNames: { label: string; value: ExerciseTypeNames }[] = [
  { label: 'PREGUNTA ABIERTA', value: 'closedAnswer' },
  { label: 'RELACIÓN DE COLUMNAS', value: 'columns' },
  { label: 'CLASIFICACIÓN', value: 'classification' },
  { label: 'DRAG & DROP', value: 'draganddrop' },
  { label: 'OPCIÓN MÚLTIPLE', value: 'multipleChoice' },
  { label: 'PREGUNTAS MÚLTIPLES', value: 'multipleQuestions' },
  { label: 'SECUENCIA', value: 'sequence' },
  { label: 'VERDADERO O FALSO', value: 'trueFalse' }
];

export const exerciseIcon: { image: string; value: ExerciseTypeNames }[] = [
  { image: closed, value: 'closedAnswer' },
  { image: columns, value: 'columns' },
  { image: classification, value: 'classification' },
  { image: dragdrop, value: 'draganddrop' },
  { image: multiple, value: 'multipleChoice' },
  { image: multipleQuestions, value: 'multipleQuestions' },
  { image: sequence, value: 'sequence' },
  { image: trueFalse, value: 'trueFalse' }
];

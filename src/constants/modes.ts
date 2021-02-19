import { Modes } from '../utils/types';

export const modes: Modes[] = ['training', 'evaluation'];

export const modesOptions: { label: string; value: Modes }[] = [
  { label: 'Entrenamiento', value: 'training' },
  { label: 'Evaluación', value: 'evaluation' }
];

import { Difficulties } from '../utils/types';

export const difficulties: Difficulties[] = ['easy', 'medium', 'hard', 'expert'];

export const difficultyOptions: { label: string; value: Difficulties }[] = [
  { label: 'Fácil', value: 'easy' },
  { label: 'Moderado', value: 'medium' },
  { label: 'Experto', value: 'hard' },
  { label: 'Difícil', value: 'expert' }
];

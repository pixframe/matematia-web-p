import { Skills } from '../utils/types';

export const modes: Skills[] = [
  'visuospatiality',
  'temporalSpace',
  'workingMemory',
  'mentalAgility',
  'planning',
  'mathematicalThinking',
  'semanticMemory',
  'proceduralMemory',
  'reasoning'
];

export const skillOptions: { label: string; value: Skills }[] = [
  { label: 'Visoespacialidad', value: 'visuospatiality' },
  { label: 'Espacio-temporal', value: 'temporalSpace' },
  { label: 'Memoria de trabajo', value: 'workingMemory' },
  { label: 'Velocidad de procesamiento', value: 'mentalAgility' },
  { label: 'Planeación', value: 'planning' },
  { label: 'Pensamiento matemático', value: 'mathematicalThinking' },
  { label: 'Memoria semántica', value: 'semanticMemory' },
  { label: 'Memoria procedimental', value: 'proceduralMemory' },
  { label: 'Razonamiento ', value: 'reasoning' }
];

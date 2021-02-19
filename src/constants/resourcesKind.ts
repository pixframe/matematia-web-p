import { ResourceKind } from '../utils/types';

export const modes: ResourceKind[] = ['video', 'web'];

export const resourcesOptions: { label: string; value: ResourceKind }[] = [
  { label: 'Video', value: 'video' },
  { label: 'Web', value: 'web' },
  { label: 'Bibliografia', value: 'bibliografy' }
];

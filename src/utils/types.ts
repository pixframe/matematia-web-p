export interface CustomError {
  message: string;
  code: string;
}

export interface Profile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  grade: string;
  institution: string;
  entity: string;
  score: number;
  topics: number[];
  exercises: number;
  visuospaciality: number;
  temporalSpace: number;
  workingMemory: number;
  mentalAgility: number;
  planing: number;
  mathematicalThinking: number;
  semanticMemory: number;
  proceduralMemory: number;
  reasoning: number;
  kindOfUser: 'student' | 'teacher' | '';
  avatar: string;
  birthDate: Date | undefined;
  sex: string;
  isHistoryWatch: boolean;
  currentTopicCode: number | null;
  failedTopics: number[];
}

export interface Role {
  id: string;
  user: Profile;
  email: string;
  level: string;
  status: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type ExerciseTypeNames =
  | 'multipleChoice'
  | 'closedAnswer'
  | 'columns'
  | 'trueFalse'
  | 'sequence'
  | 'classification'
  | 'multipleQuestions'
  | 'draganddrop';
export type Difficulties = 'easy' | 'medium' | 'hard' | 'expert';
export type Modes = 'training' | 'evaluation';
export type Skills =
  | 'visuospatiality'
  | 'temporalSpace'
  | 'workingMemory'
  | 'mentalAgility'
  | 'planning'
  | 'mathematicalThinking'
  | 'semanticMemory'
  | 'proceduralMemory'
  | 'reasoning';

export type HelpType = 'text' | 'link' | 'video' | 'image';
export type ResourceKind = 'video' | 'web' | 'bibliografy';
export type TrainingStatus = 'incomplete' | 'complete';

export interface Help {
  type: HelpType;
  url?: string;
  image?: File | string;
  text: string;
}

export interface Answer {
  id: string;
  text: string;
  image: string;
  explanation: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  image: string;
  explanation: string;
  answers: Answer[];
}

export interface Exercise {
  id: string;
  type: ExerciseTypeNames;
  text: string;
  questions: Question[];
  image: File | string;
  explanation: string;
  help: Help;
  estimatedTime: number;
  isTimeLimited: boolean;
  difficulty: Difficulties;
  mode: Modes;
  skills: Skills[];
  subtopicId: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Resource {
  label: string;
  link: string;
  kind: ResourceKind;
}

export interface Topic {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  description: string;
  tags: string;
  prerequisites: string[];
  subtopicNames: string[];
  createdAt: Date;
  createdBy: string;
  updatedAt: Date | null;
  updatedBy: string;
  post: string;
  resources: Resource[];
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  accentSecondaryColor: string;
  subtopics: string[];
  silhouetteImage: string;
  sceneImage: string | File;
  professionalImage: string;
  videoID: string;
}

export interface Subtopic {
  id: string;
  name: string;
  description: string;
  image: File | string;
  tags: string;
  exercises: Exercise[];
  createdAt: Date;
  createdBy: string;
  updatedAt: Date | null;
  updatedBy: string;
}

export interface Training {
  id: string;
  userId: string;
  topicName: string;
  subtopicsId: string;
  beginAt: Date;
  exercises: string[];
  records: AnswerRecord[];
  trainingTime: number;
  result: number;
  status: TrainingStatus;
}

export interface AnswerRecord {
  exerciseId: string;
  answer: string;
  answerFinishTime: number;
  exerciseType: ExerciseTypeNames;
  result: 'correct' | 'wrong';
  needHint: boolean;
  skills: Skills[];
}

export interface Link {
  id: string;
  user: string;
  viewer: string;
  viewerUsername: string;
  createdAt: Date | null;
}

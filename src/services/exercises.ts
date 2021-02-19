import get from 'lodash/get';
import { Exercise } from '../utils/types';
import firebase, { getColRef, requireUser } from '../utils/firebase';
import { handleFile } from '../utils/storage';
import { isFile } from '../utils/typeGuards';
import { getExerciseDocRef } from '../utils/references';

export function parseExercise(data: unknown): Exercise {
  return {
    type: get(data, 'type', 'closedAnswer'),
    id: get(data, 'id', ''),
    subtopicId: get(data, 'subtopicId', ''),
    text: get(data, 'text', ''),
    questions: get(data, 'questions', []),
    image: get(data, 'image', ''),
    explanation: get(data, 'explanation', ''),
    help: get(data, 'help', ''),
    estimatedTime: get(data, 'estimatedTime', 0),
    isTimeLimited: get(data, 'isTimeLimited', false),
    difficulty: get(data, 'difficulty', 0),
    mode: get(data, 'mode', false),
    skills: get(data, 'skills', []),
    createdAt: get(data, 'createdAt', ''),
    createdBy: get(data, 'createdBy', null),
    updatedAt: get(data, 'updatedAt', ''),
    updatedBy: get(data, 'updatedBy', null)
  };
}

export function parseExerciseData(data?: unknown): Exercise {
  return parseExercise(data);
}

export function exerciseFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Exercise {
  const data = snapshot.data() || {};

  return parseExerciseData({ ...data, id: snapshot.id });
}

export async function exercisesShow(exerciseId: string): Promise<Exercise> {
  const ref = getExerciseDocRef(exerciseId);
  const snapshot = await ref.get();
  return exerciseFromSnapshot(snapshot);
}

export async function exercisesList(subtopicId: string): Promise<Exercise[]> {
  const snapshot = await getColRef('exercises').where('subtopicId', '==', subtopicId).get();
  const data = snapshot.docs.map(exerciseFromSnapshot);
  return data;
}

export async function exercisesCreate(subtopicId: string, data: Exercise): Promise<Exercise> {
  const ref = getExerciseDocRef();
  const user = requireUser();

  const body = {
    type: get(data, 'type', 'closedAnswer'),
    id: get(data, 'id', ''),
    subtopicId: subtopicId,
    question: get(data, 'question', ''),
    explanation: get(data, 'explanation', ''),
    answers: get(data, 'answers', ''),
    image: get(data, 'image', ''),
    createdAt: new Date(),
    createdBy: user.uid,
    text: get(data, 'text', ''),
    help: get(data, 'help', ''),
    estimatedTime: get(data, 'estimatedTime', 0),
    isTimeLimited: get(data, 'isTimeLimited', false),
    difficulty: get(data, 'difficulty', 0),
    isEvaluation: get(data, 'isEvaluation', false),
    skills: get(data, 'skills', ''),
    questions: get(data, 'questions', [])
  };

  if (isFile(data.image)) {
    body.image = await handleFile('exercises', ref.id, 'image', data.image);
  }

  if (isFile(data.help.image)) {
    const helpImage = await handleFile('exercises', ref.id, 'image_help', data.help.image);
    const help = { ...data.help, image: helpImage };
    body.help = help;
  }

  await ref.set(body);

  const exercise = await exercisesShow(ref.id);

  return exercise;
}

export async function exercisesUpdate(data: Exercise): Promise<Exercise> {
  try {
    const ref = getExerciseDocRef(data.id);
    const user = requireUser();

    const body = {
      type: get(data, 'type', 'closedAnswer'),
      id: get(data, 'id', ''),
      subtopicId: get(data, 'subtopicId', ''),
      question: get(data, 'question', ''),
      explanation: get(data, 'explanation', ''),
      answers: get(data, 'answers', ''),
      image: get(data, 'image', ''),
      updatedAt: new Date(),
      updatedBy: user.uid,
      text: get(data, 'text', ''),
      help: get(data, 'help', ''),
      estimatedTime: get(data, 'estimatedTime', 0),
      isTimeLimited: get(data, 'isTimeLimited', false),
      difficulty: get(data, 'difficulty', 0),
      isEvaluation: get(data, 'isEvaluation', false),
      skills: get(data, 'skills', ''),
      questions: get(data, 'questions', [])
    };

    if (isFile(data.image)) {
      body.image = await handleFile('exercises', ref.id, 'image', data.image);
    }

    if (isFile(data.help.image)) {
      const helpImage = await handleFile('exercises', ref.id, 'image_help', data.help.image);
      const help = { ...data.help, image: helpImage };
      body.help = help;
    }

    await ref.update(body);

    const exercise = await exercisesShow(ref.id);

    return exercise;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function exercisesDelete(id: string): Promise<void> {
  await getExerciseDocRef(id).delete();
}

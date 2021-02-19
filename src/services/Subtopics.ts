import get from 'lodash/get';
import { Subtopic, Exercise } from '../utils/types';
import { getColRef, getDocRef, requireUser } from '../utils/firebase';
import { handleFile } from '../utils/storage';
import { isFile } from '../utils/typeGuards';

export function parseSubtopicData(data?: firebase.firestore.DocumentData | null): Subtopic {
  return {
    id: get(data, 'id', ''),
    name: get(data, 'name', ''),
    description: get(data, 'description', ''),
    image: get(data, 'image', ''),
    tags: get(data, 'tags', ''),
    exercises: get(data, 'exercises', []),
    createdAt: get(data, 'createdAt', ''),
    createdBy: get(data, 'createdBy', null),
    updatedAt: get(data, 'updatedAt', ''),
    updatedBy: get(data, 'updatedBy', null)
  };
}

export function subtopicFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Subtopic {
  const data = snapshot.data() || {};

  if (snapshot.exists) {
    return parseSubtopicData({ ...data, id: snapshot.id });
  } else {
    return parseSubtopicData();
  }
}

export async function subtopicsShow(id: string): Promise<Subtopic> {
  const ref = getDocRef('subtopics', id);
  const snapshot = await ref.get();

  const data = subtopicFromSnapshot(snapshot);
  return data;
}

export async function subtopicsList(): Promise<Subtopic[]> {
  const snapshot = await getColRef('subtopics').get();
  const data = snapshot.docs.map(subtopicFromSnapshot);
  return data;
}

interface CreateSubtopicInput {
  name: string;
  description: string;
  image: File;
  tags: string;
  exercises: Exercise[];
}

export async function subtopicsCreate(data: Subtopic): Promise<Subtopic> {
  const ref = getDocRef('subtopics');
  const user = requireUser();

  const body = {
    name: get(data, 'name', ''),
    description: get(data, 'description', ''),
    image: '',
    tags: get(data, 'tags', ''),
    exercises: [], // temporal
    createdAt: new Date(),
    createdBy: user.uid
  };

  if (isFile(data.image)) {
    body.image = await handleFile('subtopics', ref.id, 'image', data.image);
  }

  await ref.set(body);

  const subtopic = await subtopicsShow(ref.id);

  return subtopic;
}

interface UpdateSubtopicInput {
  id: string;
  name: string;
  description: string;
  image: File;
  tags: string;
  exercises: Exercise[];
}

export async function subtopicsUpdate(data: Subtopic): Promise<Subtopic> {
  try {
    const ref = getDocRef('subtopics', data.id);
    const user = requireUser();

    const body = {
      name: get(data, 'name', ''),
      description: get(data, 'description', ''),
      image: '',
      tags: get(data, 'tags', ''),
      exercises: [], // temporal
      updatedAt: new Date(),
      updatedBy: user.uid
    };

    if (isFile(data.image)) {
      body.image = await handleFile('subtopics', ref.id, 'image', data.image);
    }

    await ref.update(body);

    const subtopic = await subtopicsShow(ref.id);

    return subtopic;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function subtopicsDelete(id: string): Promise<void> {
  await getDocRef('subtopics', id).delete();
}

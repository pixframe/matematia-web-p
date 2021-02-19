import get from 'lodash/get';
import { getColRef, getDocRef, requireUser, firestore } from '../utils/firebase';
import { Topic } from '../utils/types';
import { handleFile } from '../utils/storage';
import { isFile } from '../utils/typeGuards';
import { CustomError } from '@calderaro/react-toolbox';
import { getEditorStateLengthFromString } from '../utils/parseEditorData';

export function parseTopicData(data?: firebase.firestore.DocumentData | null): Topic {
  return {
    id: get(data, 'id', ''),
    name: get(data, 'name', ''),
    country: get(data, 'country', ''),
    city: get(data, 'city', ''),
    description: get(data, 'description', ''),
    tags: get(data, 'tags', ''),
    code: get(data, 'code', ''),
    prerequisites: get(data, 'prerequisites', []),
    createdAt: get(data, 'createdAt', ''),
    createdBy: get(data, 'createdBy', null),
    updatedAt: get(data, 'updatedAt', ''),
    updatedBy: get(data, 'updatedBy', null),
    post: get(data, 'post', ''),
    resources: get(data, 'resources', []),
    silhouetteImage: get(data, 'silhouetteImage', ''),
    sceneImage: get(data, 'sceneImage', ''),
    subtopicNames: get(data, 'subtopicNames', []),
    professionalImage: get(data, 'professionalImage', ''),
    primaryColor: get(data, 'primaryColor', ''),
    secondaryColor: get(data, 'secondaryColor', ''),
    accentColor: get(data, 'accentColor', ''),
    accentSecondaryColor: get(data, 'accentSecondaryColor', ''),
    subtopics: get(data, 'subtopics', []),
    videoID: get(data, 'videoID', '')
  };
}

export function topicFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Topic {
  const data = snapshot.data() || {};

  if (snapshot.exists) {
    return parseTopicData({ ...data, id: snapshot.id });
  } else {
    return parseTopicData();
  }
}

export async function topicsShow(id: string): Promise<Topic> {
  const ref = getDocRef('topics', id);
  const snapshot = await ref.get();

  const data = topicFromSnapshot(snapshot);

  return data;
}

export async function topicsList(): Promise<Topic[]> {
  const snapshot = await getColRef('topics').get();
  const data = snapshot.docs.map(topicFromSnapshot);
  return data;
}

export async function topicGetByCode(code: number): Promise<Topic> {
  const snapshot = await getColRef('topics').where('code', '==', code.toString()).get();
  const data = snapshot.docs.map(topicFromSnapshot);
  return data[0];
}

export async function topicsCreate(data: Topic): Promise<Topic> {
  validateTopicData(data);

  const ref = getDocRef('topics');
  const user = requireUser();

  const body = {
    name: get(data, 'name', ''),
    country: get(data, 'country', ''),
    city: get(data, 'city', ''),
    description: get(data, 'description', ''),
    tags: get(data, 'tags', ''),
    createdAt: new Date(),
    code: get(data, 'code', ''),
    prerequisites: get(data, 'prerequisites', []),
    createdBy: user.uid,
    updatedAt: get(data, 'updatedAt', ''),
    updatedBy: get(data, 'updatedBy', null),
    post: get(data, 'post', ''),
    resources: get(data, 'resources', []),
    primaryColor: get(data, 'primaryColor', ''),
    secondaryColor: get(data, 'secondaryColor', ''),
    accentColor: get(data, 'accentColor', ''),
    accentSecondaryColor: get(data, 'accentSecondaryColor', ''),
    subtopics: get(data, 'subtopics', []),
    videoID: get(data, 'videoID', ''),
    silhouetteImage: get(data, 'silhouetteImage', ''),
    sceneImage: get(data, 'sceneImage', ''),
    subtopicNames: get(data, 'subtopicNames', []),
    professionalImage: get(data, 'professionalImage', '')
  };

  if (isFile(data.sceneImage)) {
    body.sceneImage = await handleFile('topics', ref.id, 'sceneImage', data.sceneImage);
  }

  await ref.set(body);

  const subtopic = await topicsShow(ref.id);

  return subtopic;
}

export async function topicsUpdate(data: Topic): Promise<Topic> {
  validateTopicData(data);

  const ref = getDocRef('topics', data.id);
  const user = requireUser();

  const body = {
    name: get(data, 'name', ''),
    country: get(data, 'country', ''),
    city: get(data, 'city', ''),
    description: get(data, 'description', ''),
    tags: get(data, 'tags', ''),
    createdAt: get(data, 'createdAt', ''),
    code: get(data, 'code', ''),
    prerequisites: get(data, 'prerequisites', []),
    updatedAt: new Date(),
    updatedBy: user.uid,
    post: get(data, 'post', ''),
    resources: get(data, 'resources', []),
    primaryColor: get(data, 'primaryColor', ''),
    secondaryColor: get(data, 'secondaryColor', ''),
    accentColor: get(data, 'accentColor', ''),
    accentSecondaryColor: get(data, 'accentSecondaryColor', ''),
    subtopics: get(data, 'subtopics', []),
    videoID: get(data, 'videoID', ''),
    silhouetteImage: get(data, 'silhouetteImage', ''),
    sceneImage: get(data, 'sceneImage', ''),
    subtopicNames: get(data, 'subtopicNames', []),
    professionalImage: get(data, 'professionalImage', '')
  };

  if (isFile(data.sceneImage)) {
    body.sceneImage = await handleFile('topics', ref.id, 'sceneImage', data.sceneImage);
  }

  await ref.update(body);

  const topic = await topicsShow(ref.id);

  return topic;
}

export async function topicsDelete(id: string): Promise<void> {
  await getDocRef('topics', id).delete();
}

export function validateTopicData(data: Topic) {
  const error = new CustomError('Datos inválidos', 'invalid-form-data');

  if (data.name.length < 5 || data.name.length > 200) {
    error.setError('name', 'El nombre debe ser de entre 5 y 200 caracteres');
  }

  if (getEditorStateLengthFromString(data.post) > 3000) {
    error.setError('post', 'El post puede tener un maximo de 3000 caracteres');
  }

  if (error.length) {
    throw error;
  }
}

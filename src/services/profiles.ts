import { CustomError } from '@calderaro/react-toolbox';
import firebase from 'firebase';
import { DocumentSnapshot, DocumentData } from '@firebase/firestore-types';
import get from 'lodash/get';
import { requireUser, getDocRef, getColRef } from '../utils/firebase';
import { Profile } from '../utils/types';

export const defaultState: Profile = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  grade: '',
  institution: '',
  entity: '',
  score: 0,
  topics: [],
  exercises: 0,
  visuospaciality: 0,
  temporalSpace: 0,
  workingMemory: 0,
  mentalAgility: 0,
  planing: 0,
  mathematicalThinking: 0,
  semanticMemory: 0,
  proceduralMemory: 0,
  reasoning: 0,
  kindOfUser: '',
  avatar: '',
  birthDate: undefined,
  sex: '',
  isHistoryWatch: false,
  currentTopicCode: null,
  failedTopics: []
};

export function getProfileDefaultState(data?: DocumentData | null): Profile {
  return {
    id: get(data, 'id', ''),
    username: get(data, 'username', ''),
    firstName: get(data, 'firstName', ''),
    lastName: get(data, 'lastName', ''),
    grade: get(data, 'grade', ''),
    institution: get(data, 'institution', ''),
    entity: get(data, 'entity', ''),
    score: get(data, 'score', 0),
    topics: get(data, 'topics', []),
    exercises: get(data, 'exercises', 0),
    visuospaciality: get(data, 'visuospaciality', 0),
    temporalSpace: get(data, 'temporalSpace', 0),
    workingMemory: get(data, 'workingMemory', 0),
    mentalAgility: get(data, 'mentalAgility', 0),
    planing: get(data, 'planing', 0),
    mathematicalThinking: get(data, 'mathematicalThinking', 0),
    semanticMemory: get(data, 'semanticMemory', 0),
    proceduralMemory: get(data, 'proceduralMemory', 0),
    reasoning: get(data, 'reasoning', 0),
    kindOfUser: get(data, 'kindOfUser', ''),
    avatar: get(data, 'avatar', ''),
    birthDate: get(data, 'birthDate', ''),
    sex: get(data, 'sex', ''),
    isHistoryWatch: get(data, 'isHistoryWatch', false),
    currentTopicCode: get(data, 'currentTopicCode', null),
    failedTopics: get(data, 'failedTopics', [])
  };
}

function ProfileFromSnapshot(snapshot: DocumentSnapshot): Profile {
  const data = snapshot.data() || {};
  return getProfileDefaultState({ ...data, id: snapshot.id });
}

export async function profilesList(): Promise<Profile[]> {
  const snap = await getColRef('profiles').get();
  const data = snap.docs.map(ProfileFromSnapshot);
  return data;
}

export async function profileShow(id: string): Promise<Profile> {
  const snap = await getDocRef('profiles', id).get();
  return ProfileFromSnapshot(snap);
}

export async function profilesUpdate(data: Profile): Promise<Profile> {
  const ref = getDocRef('profiles', data.id);

  const body: Omit<Profile, 'id'> = {
    username: get(data, 'username', ''),
    firstName: get(data, 'firstName', ''),
    lastName: get(data, 'lastName', ''),
    grade: get(data, 'grade', ''),
    institution: get(data, 'institution', ''),
    entity: get(data, 'entity', ''),
    score: get(data, 'score', 0),
    topics: get(data, 'topics', []),
    exercises: get(data, 'exercises', 0),
    visuospaciality: get(data, 'visuospaciality', 0),
    temporalSpace: get(data, 'temporalSpace', 0),
    workingMemory: get(data, 'workingMemory', 0),
    mentalAgility: get(data, 'mentalAgility', 0),
    planing: get(data, 'planing', 0),
    mathematicalThinking: get(data, 'mathematicalThinking', 0),
    semanticMemory: get(data, 'semanticMemory', 0),
    proceduralMemory: get(data, 'proceduralMemory', 0),
    reasoning: get(data, 'reasoning', 0),
    kindOfUser: get(data, 'kindOfUser', ''),
    avatar: get(data, 'avatar', ''),
    birthDate: get(data, 'birthDate', undefined),
    sex: get(data, 'sex', ''),
    isHistoryWatch: get(data, 'isHistoryWatch', false),
    currentTopicCode: get(data, 'currentTopicCode', null),
    failedTopics: get(data, 'failedTopics', [])
  };

  await ref.set(body, { merge: true });

  return { ...body, id: ref.id };
}

export async function profilesDelete(id: string): Promise<void> {
  await getDocRef('profiles', id).delete();
}

// USER PART
export async function profileShowOwn(): Promise<Profile> {
  const user = requireUser();
  const snap = await getDocRef('profiles', user.uid).get();
  return ProfileFromSnapshot(snap);
}

export async function profileUpdateOwn(data: Partial<Omit<Profile, 'id'>>): Promise<Profile> {
  const user = requireUser();
  const ref = getDocRef('profiles', user.uid);

  //data validation here

  validateProfileData(data);

  await ref.set(data, { merge: true });

  const result = await profileShowOwn();

  return result;
}

export async function profileUpdateTopic(topicCode: number) {
  const user = requireUser();
  const ref = getDocRef('profiles', user.uid);
  await ref.update({
    currentTopicCode: topicCode
  });
}

export async function profileUpdateValues(
  visuospaciality: number,
  temporalSpace: number,
  workingMemory: number,
  mentalAgility: number,
  planing: number,
  mathematicalThinking: number,
  semanticMemory: number,
  proceduralMemory: number,
  reasoning: number,
  pass: boolean,
  currentTopicCode: number
) {
  const user = requireUser();
  const ref = getDocRef('profiles', user.uid);

  if (pass) {
    await ref.update({
      visuospaciality: firebase.firestore.FieldValue.increment(visuospaciality),
      temporalSpace: firebase.firestore.FieldValue.increment(temporalSpace),
      workingMemory: firebase.firestore.FieldValue.increment(workingMemory),
      mentalAgility: firebase.firestore.FieldValue.increment(mentalAgility),
      planing: firebase.firestore.FieldValue.increment(planing),
      mathematicalThinking: firebase.firestore.FieldValue.increment(mathematicalThinking),
      semanticMemory: firebase.firestore.FieldValue.increment(semanticMemory),
      proceduralMemory: firebase.firestore.FieldValue.increment(proceduralMemory),
      reasoning: firebase.firestore.FieldValue.increment(reasoning),
      currentTopicCode: firebase.firestore.FieldValue.delete(),
      topics: firebase.firestore.FieldValue.arrayUnion(currentTopicCode)
    });
  } else {
    const snapShot = await ref.get();
    const profile = ProfileFromSnapshot(snapShot);
    await ref.update({
      visuospaciality: firebase.firestore.FieldValue.increment(visuospaciality),
      temporalSpace: firebase.firestore.FieldValue.increment(temporalSpace),
      workingMemory: firebase.firestore.FieldValue.increment(workingMemory),
      mentalAgility: firebase.firestore.FieldValue.increment(mentalAgility),
      planing: firebase.firestore.FieldValue.increment(planing),
      mathematicalThinking: firebase.firestore.FieldValue.increment(mathematicalThinking),
      semanticMemory: firebase.firestore.FieldValue.increment(semanticMemory),
      proceduralMemory: firebase.firestore.FieldValue.increment(proceduralMemory),
      reasoning: firebase.firestore.FieldValue.increment(reasoning),
      currentTopicCode: firebase.firestore.FieldValue.delete(),
      failedTopics: [...profile.failedTopics, currentTopicCode]
    });
  }
}

export async function updateHistory() {
  const user = requireUser();
  const ref = getDocRef('profiles', user.uid);

  await ref.update({
    isHistoryWatch: true
  });
  window.location.reload();
}

export function validateProfileData(data: Partial<Omit<Profile, 'id'>>) {
  const error = new CustomError('Datos inválidos', 'invalid-form-data');

  if (data.firstName !== undefined && (data.firstName.length < 3 || data.firstName.length > 30)) {
    error.setError('firstName', 'El nombre debe ser de entre 5 y 30 caracteres');
  }
  if (data.lastName !== undefined && (data.lastName.length < 2 || data.lastName.length > 30)) {
    error.setError('lastName', 'El apellido debe ser de entre 5 y 30 caracteres');
  }
  if (data.username !== undefined && (data.username.length < 5 || data.username.length > 30)) {
    error.setError('username', 'El nombre de usuario debe ser de entre 5 y 30 caracteres');
  }
  if (data.grade !== undefined && !data.grade.length) {
    error.setError('grade', 'Debes seleccionar un grado escolar');
  }
  if (data.institution !== undefined && !data.institution.length) {
    error.setError('institution', 'Ingresa el nombre de tu institución académica');
  }
  if (data.institution && (data.institution.length < 5 || data.institution.length > 100)) {
    error.setError('institution', 'La institución académica debe tener entre 5 y 100 caracteres');
  }
  if (data.entity !== undefined && !data.entity.length) {
    error.setError('entity', 'Debes seleccionar tu entidad');
  }
  if (data.avatar !== undefined && !data.avatar.length) {
    error.setError('avatar', 'Debes seleccionar un avatar');
  }
  if (data.sex !== undefined && !data.sex.length) {
    error.setError('sex', 'Debes seleccionar una opcion');
  }
  if (data.birthDate === undefined) {
    error.setError('birthDate', 'Debes seleccionar una fecha');
  }
  if (error.length) {
    throw error;
  }
}

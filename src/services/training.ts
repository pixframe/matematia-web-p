import get from 'lodash/get';
import firebase, { getColRef, getDocRef, requireUser } from '../utils/firebase';
import { Training, TrainingStatus } from '../utils/types';

export function parseTraining(data?: firebase.firestore.DocumentData | null): Training {
  return {
    id: get(data, 'id', ''),
    userId: get(data, 'userId', ''),
    topicName: get(data, 'topicName', ''),
    subtopicsId: get(data, 'subtopicsId', ''),
    exercises: get(data, 'exercises', []),
    records: get(data, 'records', []),
    trainingTime: get(data, 'trainingTime', ''),
    result: get(data, 'result', ''),
    beginAt: get(data, 'begin', ''),
    status: get(data, 'status', 'incomplete' as TrainingStatus)
  };
}

export function trainingFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Training {
  const data = snapshot.data() || {};

  if (snapshot.exists) {
    return parseTraining({ ...data, id: snapshot.id });
  } else {
    return parseTraining();
  }
}

export async function trainingShow(id: string): Promise<Training> {
  const ref = getDocRef('training', id);
  const snapshot = await ref.get();

  const data = trainingFromSnapshot(snapshot);

  return data;
}

export async function trainingList(): Promise<Training[]> {
  const snapshot = await getColRef('training').get();
  const data = snapshot.docs.map(trainingFromSnapshot);
  return data;
}

export async function trainingCreate(data: Training): Promise<string> {
  const ref = getDocRef('training');
  const user = requireUser();

  const body = {
    id: get(data, 'id', ''),
    userId: user.uid,
    topicName: get(data, 'topicName', ''),
    subtopicsId: get(data, 'subtopicsId', ''),
    exercises: get(data, 'exercises', []),
    records: get(data, 'records', []),
    trainingTime: get(data, 'trainingTime', ''),
    result: get(data, 'result', ''),
    beginAt: new Date(),
    status: get(data, 'status', 'incomplete' as TrainingStatus)
  };

  await ref.set(body);

  return ref.id;
}

export async function trainingUpdate(data: Training): Promise<Training> {
  try {
    const ref = getDocRef('training', data.id);
    const user = requireUser();

    const body = {
      id: get(data, 'id', ''),
      userId: user.uid,
      topicName: get(data, 'topicName', ''),
      subtopicsId: get(data, 'subtopicsId', ''),
      exercises: get(data, 'exercises', []),
      records: get(data, 'records', []),
      trainingTime: get(data, 'trainingTime', ''),
      result: get(data, 'result', ''),
      status: get(data, 'status', 'incomplete' as TrainingStatus)
    };

    await ref.update(body);

    const subtopic = await trainingShow(ref.id);

    return subtopic;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function trainingFind(topicID: string): Promise<Training | null> {
  const user = requireUser();
  const snapshot = await getColRef('training')
    .where('userId', '==', user.uid)
    .where('topicName', '==', topicID)
    .where('status', '==', 'incomplete')
    .get();
  if (snapshot.docs.length < 1) return null;
  const data = trainingFromSnapshot(snapshot.docs[0]);
  return data;

}

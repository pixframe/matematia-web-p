import get from 'lodash/get';
import { functions, firestore, requireUser } from '../utils/firebase';
import { Link } from '../utils/types';

export function parseLink(data?: unknown): Link {
  return {
    id: get(data, 'id', ''),
    user: get(data, 'user', ''),
    viewer: get(data, 'viewer', ''),
    viewerUsername: get(data, 'viewerUsername', ''),
    createdAt: get(data, 'lastName', '')
  };
}

export function linkFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot) {
  const data = snapshot.data() || {};
  return parseLink({ ...data, id: snapshot.id });
}

export interface CreateLinkFormState {
  username: string;
}

export function createLinkFormDefaultState(): CreateLinkFormState {
  return {
    username: ''
  };
}

export async function linksCreate(data: CreateLinkFormState): Promise<CreateLinkFormState> {
  if (!data.username) {
    throw new Error('invalid-viewer');
  }

  await functions.httpsCallable('createLink')(data);

  return { username: '' };
}

export async function linksListOwn(): Promise<Link[]> {
  const uid = requireUser().uid;
  const snap = await firestore.collection('links').where('user', '==', uid).get();
  const data = snap.docs.map(linkFromSnapshot);
  return data;
}

export async function linksDelete(id: string): Promise<void> {
  if (!id) {
    throw new Error('invalid-id');
  }

  await firestore.collection('links').doc(id).delete();
}

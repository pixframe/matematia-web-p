import firebase from 'firebase';

const credentials = JSON.parse(atob(process.env.REACT_APP_FIREBASE_CONFIG as string));

firebase.initializeApp(credentials);

export const app = firebase;
export const analytics = firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const storageRef = storage.ref();

firebase.performance();

export const remoteConfig = firebase.remoteConfig();

if (remoteConfig) {
  remoteConfig.settings.minimumFetchIntervalMillis = 3000;
}

export default firebase;

export function getCurrentUser(): firebase.User | null {
  return firebase.auth().currentUser;
}

export function requireUser(): firebase.User {
  const user = getCurrentUser();
  if (user) {
    return user;
  }
  throw new Error('require-signin');
}

export function getColRef(collection: string): firebase.firestore.CollectionReference {
  return firebase.firestore().collection(collection);
}

export function getDocRef(
  collection: string,
  document?: string
): firebase.firestore.DocumentReference {
  if (collection && document) {
    return getColRef(collection).doc(document);
  }
  return getColRef(collection).doc();
}

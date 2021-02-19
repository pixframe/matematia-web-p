import firebase from './firebase';

export function getExerciseDocRef(exerciseId?: string) {
  if (exerciseId) {
    return firebase.firestore().collection('exercises').doc(exerciseId);
  } else {
    return firebase.firestore().collection('exercises').doc();
  }
}

export function getExercisesColRef(subtopicId: string) {
  return firebase.firestore().collection('subtopics').doc(subtopicId).collection('exercises');
}

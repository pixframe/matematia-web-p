import { firestore, requireUser } from './firebase';
import { Training } from './types';

export const listOfTrainings = async () => {
  const user = requireUser();
  const snapshot = await firestore.collection('training').where('userId', '==', user.uid).get();
  const list: Training[] = [];
  snapshot.forEach((snap) => {
    list.push(snap.data() as Training);
  });
  return list;
};

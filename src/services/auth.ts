import get from 'lodash/get';
import firebase, { auth, analytics, requireUser } from '../utils/firebase';
import { User, UserCredential } from '@firebase/auth-types';
import CustomError from '../utils/CustomError';

export async function getIdTOken() {
  const IdTokenResult = await requireUser().getIdTokenResult();
  return IdTokenResult;
}

export async function verifyPasswordResetCode(actionCode: string) {
  if (!auth) {
    throw new Error('no-firebase');
  }
  const email = await auth.verifyPasswordResetCode(actionCode);
  return email;
}
export async function confirmPasswordReset(
  actionCode: string,
  email: string,
  newPassword: string,
  repassword: string
) {
  if (!auth) {
    throw new Error('no-firebase');
  }
  await auth.confirmPasswordReset(actionCode, newPassword);
  await auth.signInWithEmailAndPassword(email, newPassword);
}

export async function handleRecoverEmail(actionCode: string) {
  if (!auth) {
    throw new Error('no-firebase');
  }

  const info = await auth.checkActionCode(actionCode);
  await auth.applyActionCode(actionCode);

  if (info.data.email) {
    await auth.sendPasswordResetEmail(info.data.email);
  }
}

export async function handleVerifyEmail(actionCode: string) {
  if (!auth) {
    throw new Error('no-firebase');
  }
  await auth.applyActionCode(actionCode);
}

export async function googleSignIn(): Promise<UserCredential> {
  const GoogleAuthProvider = firebase?.auth?.GoogleAuthProvider;
  if (!GoogleAuthProvider) {
    throw new Error();
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const user = await auth.signInWithPopup(provider);
  return user;
}

export async function facebookSignIn(): Promise<UserCredential> {
  const FacebookAuthProvider = firebase?.auth?.FacebookAuthProvider;
  if (!FacebookAuthProvider) {
    throw new Error();
  }

  const provider = new FacebookAuthProvider();
  const user = await auth.signInWithPopup(provider);
  return user;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  repassword: string
): Promise<User | null> {
  if (password !== repassword) {
    throw new CustomError('Las contraseñas no coinciden', 'auth/invalid-repassword');
  }

  const Credential = await auth.createUserWithEmailAndPassword(email, password);

  if (!Credential.user) {
    return null;
  }

  analytics.setUserId(Credential.user.uid);

  await Credential.user.sendEmailVerification();

  return Credential.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User | null> {
  const Credential = await auth.signInWithEmailAndPassword(email, password);

  if (!Credential.user) {
    return null;
  }

  analytics.setUserId(Credential.user.uid);

  return Credential.user;
}

export async function isAdmin(): Promise<boolean> {
  const token = await getIdTOken();
  const value = get(token, 'claims.admin', false);
  return value;
}

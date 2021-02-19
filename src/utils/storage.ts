import firebase from './firebase';

export const handleFile = async (
  collection: string,
  document: string,
  name: string,
  file: File
): Promise<string> => {
  const lastDot = file.name.lastIndexOf('.');
  const ext = file.name.substring(lastDot + 1);
  const path = `${collection}/${document}/${name}.${ext}`;
  const ref = firebase.storage().ref().child(path);
  const meta = { contentType: file.type, cacheControl: 'public,max-age=300' };
  await ref.put(file, meta);
  return path;
};

export default function getStorageURL(path: string): string {
  const encoded = encodeURIComponent(path);
  const bucket = firebase.storage().ref().bucket;
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encoded}?alt=media`;
}

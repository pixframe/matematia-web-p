export function isFile(input: File | unknown): input is File {
  return (input as File)?.name !== undefined;
}

import { convertFromRaw, EditorState } from 'draft-js';

export function getEditorStateFromString(value: string) {
  try {
    const json = JSON.parse(value);
    const contentState = convertFromRaw(json);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  } catch (err) {
    return EditorState.createEmpty();
  }
}

export function getEditorStateLength(editorState: EditorState): number {
  return editorState.getCurrentContent().getPlainText('').length;
}

export function getEditorStateLengthFromString(editorStateString: string): number {
  const editorState = getEditorStateFromString(editorStateString);
  return editorState.getCurrentContent().getPlainText('').length;
}

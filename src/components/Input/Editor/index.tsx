import React from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import style from './style.module.css';

interface EditorComponentProps {
  id: string;
  value: string;
  readOnly?: boolean;
  onChange: (data: RichText) => void;
  toolbarHidden?: boolean;
  label?: string;
  error?: string;
}

interface EditorComponentState {
  editorState: EditorState;
  length: number;
}

export interface RichText {
  id: string;
  value: string;
  type: string;
}

class EditorComponent extends React.Component<EditorComponentProps, EditorComponentState> {
  constructor(props: EditorComponentProps) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), length: 0 };
  }

  componentDidMount() {
    this.parse();
  }

  componentDidUpdate(prev: EditorComponentProps) {
    if (!prev.value && this.props.value) {
      this.parse();
    }
  }

  parse = () => {
    try {
      const json = JSON.parse(this.props.value);
      const contentState = convertFromRaw(json);
      const editorState = EditorState.createWithContent(contentState);
      const length = editorState.getCurrentContent().getPlainText('').length;
      this.setState({ editorState, length });
    } catch (err) {
      this.setState({ editorState: EditorState.createEmpty() });
    }
  };

  change = (editorState: EditorState) => {
    this.setState({
      editorState,
      length: editorState.getCurrentContent().getPlainText('').length
    });

    const { id } = this.props;
    const value = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    this.props.onChange({
      id,
      value,
      type: 'richText'
    });
  };

  render() {
    const { editorState } = this.state;
    const { toolbarHidden, readOnly, label, error, id } = this.props;
    return (
      <div className={style.inputContainerStyle}>
        <div className={style.labelContainer}>
          {label ? (
            <label className={style.label} htmlFor={id}>
              {label}
            </label>
          ) : null}
        </div>
        <Editor
          toolbarHidden={toolbarHidden}
          readOnly={readOnly}
          editorState={editorState}
          onEditorStateChange={this.change}
          wrapperClassName={readOnly ? '' : style.wrapper}
          toolbarClassName={style.toolbar}
          editorClassName={readOnly ? style.editorReadOnly : style.editor}
          placeholder="Descripción..."
        />
        <div className={style.length}>{this.state.length} Caracteres</div>
        <div className={style.errorContainer}>
          <span className={style.error}>{error}</span>
        </div>
      </div>
    );
  }
}

export default EditorComponent;

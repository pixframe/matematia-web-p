import React from 'react';
import Editor from '../Input/Editor';

interface PostReaderProps {
  id: string;
  post: string;
}

const PostReader: React.FC<PostReaderProps> = ({ id, post }) => {
  return (
    <div>
      <Editor id={id} value={post} readOnly toolbarHidden onChange={() => null}></Editor>
    </div>
  );
};

export default PostReader;

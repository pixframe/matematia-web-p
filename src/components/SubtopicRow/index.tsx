import React from 'react';
import { style } from 'typestyle';

interface SubtopicRow {
  subtopic: string;
  index: number;
}

const subtopicRows = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'start',
  paddingLeft: '1.5em',
  margin: '0.5em'
});

const subtopicPoint = style({
  minWidth: '2em',
  minHeight: '2em',
  backgroundColor: '#0071BC',
  textAlign: 'center',
  padding: '0.2em',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const subtopicText = style({
  paddingLeft: '1.2em',
  fontWeight: 'bold',
  verticalAlign: 'middle',
  display: 'flex',
  alignSelf: 'center',
  fontSize: '0.8em'
});

const SubtopicRow: React.FC<SubtopicRow> = ({ subtopic, index }) => {
  return (
    <div key={subtopic} className={subtopicRows}>
      <div className={subtopicPoint}>{index}</div>
      <div className={subtopicText}>
        <span>{subtopic.toLocaleUpperCase()}</span>
      </div>
    </div>
  );
};

export default SubtopicRow;

import { style } from 'typestyle';

const formContainer = style({
  width: '95%',
  objectPosition: 'relative',
  margin: 'auto'
});

const sectionHeader = style({
  background: 'rgba(0, 0, 0, .03)',
  padding: '.6em',
  display: 'flex',
  justifyContent: 'flex-end',
  alignContent: 'center',
  borderBottom: '1px solid rgba(0, 0, 0, .09)'
});

const sectionHeaderButton = style({
  fontSize: '1em',
  height: '2.4em',
  padding: '0 1em',
  borderRadius: '6px',
  background: '#1a73e8',
  marginLeft: '0.5em',
  color: '#fff',
  fontWeight: 500,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2)',
  width: '5em'
});

const resourcesDiv = style({
  display: 'flex',
  flexFlow: 'column',
  marginTop: '2em',
  marginBottom: '2em'
});

const resourcesRow = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'start',
  marginTop: '1em'
});

const resourcesInput = style({
  width: '40%',
  marginRight: '5%'
});

const addResource = style({
  justifySelf: 'end',
  display: 'flex',
  fontSize: '1em'
});

const subtopicInput = style({
  width: '75%',
  marginRight: '5%'
});

const colorButton = style({
  color: 'white',
  backgroundColor: '#0071BC',
  marginTop: '0.8em',
  marginBottom: '0.8em',
  padding: '0.5em',
  borderRadius: '0.5em'
});

const styles = {
  formContainer,
  sectionHeaderButton,
  sectionHeader,
  resourcesDiv,
  resourcesInput,
  resourcesRow,
  addResource,
  subtopicInput,
  colorButton
};

export default styles;

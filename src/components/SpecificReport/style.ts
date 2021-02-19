import { style } from 'typestyle';

const cardDiv = style({
  display: 'flex',
  flexFlow: 'row',
  width: '90%',
  justifyContent: 'space-between',
  marginBottom: '1.2em'
});

const mainLayout = style({
  display: 'flex',
  flexFlow: 'column',
  width: '100%',
  alignItems: 'center',
  padding: '2em',
  minHeight: '90vh'
});

const reports = style({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '90%',
  padding: '2em 1em 2em 1em',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2);',
  borderRadius: '0.4em'
});

const repoortsLink = style({
  display: 'flex',
  width: '100%',
  color: 'black',
  justifyContent: 'center'
});

const reportsTable = style({
  width: '90%',
  $nest: {
    '& tbody th': {
      borderBottom: '1px solid #D5D3D3',
      borderCollapse: 'collapse',
      padding: '0.4em'
    }
  }
});

const returnIcon = style({
  width: '3em',
  height: '3em'
});

const titleInfo = style({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center'
});

const titleName = style({
  fontSize: '1.2em',
  color: '#3589E7',
  fontWeight: 'bold',
  marginBottom: '0.8em'
});

const titleUsername = style({
  fontSize: '1em',
  color: '#A09F9F',
  marginBottom: '0.8em'
});

const topDisplay = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  alignSelf: 'normal',
  marginBottom: '2em'
});

export const styles = {
  cardDiv,
  mainLayout,
  reports,
  repoortsLink,
  reportsTable,
  returnIcon,
  titleInfo,
  titleName,
  titleUsername,
  topDisplay
};

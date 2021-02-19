import { style } from 'typestyle';

const cardDiv = style({
  display: 'flex',
  flexFlow: 'row',
  width: '80%',
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

const pagination = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between',
  width: '90%',
  marginTop: '1.5em',
  alignItems: 'center'
});

const paginationIconSize = style({
  width: '2em',
  height: '2em'
});

const profileDiv = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between'
});

const profileImage = style({
  height: '8em',
  width: '8em',
  margin: '0em 2em 0em 2em'
});

const profileInfo = style({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center'
});

const profileInstitute = style({
  fontSize: '0.8em',
  color: '#A09F9F',
  marginBottom: '0.8em'
});

const profileName = style({
  fontSize: '1.2em',
  color: '#3589E7',
  fontWeight: 'bold',
  marginBottom: '0.8em'
});

const profileUsername = style({
  fontSize: '1em',
  color: '#A09F9F',
  marginBottom: '0.8em'
});

const reports = style({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80%',
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
  pagination,
  paginationIconSize,
  profileDiv,
  profileImage,
  profileInfo,
  profileInstitute,
  profileName,
  profileUsername,
  reports,
  repoortsLink,
  reportsTable,
  returnIcon,
  topDisplay
};

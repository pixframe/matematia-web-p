import { style } from 'typestyle';

export const profileLayout = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '3em',
  paddingBottom: '3em'
});

export const columnDiv = style({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center'
});

export const columnItem = style({
  borderRadius: '1em',
  margin: '0.2em',
  padding: '1em',
  width: '80%',
  color: 'black',
  $nest: {
    '&:hover': {
      backgroundColor: '#767676',
      color: 'white'
    }
  }
});

export const activeColumItem = style({
  backgroundColor: '#3589E7',
  color: 'white'
});

export const profileColumn = style({
  display: 'flex',
  flexFlow: 'column',
  height: '15em',
  width: '100%',
  alignItems: 'center'
});

export const avatarDiv = style({
  height: '10em',
  width: '10em',
  borderRadius: '50%'
});

export const userName = style({
  fontSize: '1.5em',
  fontWeight: 'bold',
  color: '#3589E7'
});

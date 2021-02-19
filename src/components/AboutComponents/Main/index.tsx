import React from 'react';
import { style } from 'typestyle';
import pencil from '../../../assets/images/icons/landingPage/pencil.svg';
import lines from '../../../assets/images/background/lines.svg';
import matematia from '../../../assets/logos/MATEMATIA.svg';
import Button from '../../UI/Button';

const height = '20em';
const divHeight = '20em';

const mainDiv = style({
  paddingTop: '2em',
  display: 'flex',
  flexFlow: 'row',
  backgroundColor: '#3474B5',
  backgroundImage: `url(${lines})`,
  backgroundSize: 'cover',
  height: divHeight,
  justifyContent: 'center',
  width: '100%'
});

const optionDiv = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between',
  width: '80%'
});

const secondDiv = style({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'start',
  alignItems: 'start',
  maxHeight: divHeight,
  width: '40%'
});

const descriptionText = style({
  color: 'white',
  margin: '1em 1em 1em 0em'
});

const pencilDiv = style({
  height: height,
  margin: '1em'
});

const logoStyle = style({
  height: '5em'
});

const buttonDiv = style({
  marginTop: '1em'
});

const MainAbout: React.FC = () => {
  return (
    <div className={mainDiv}>
      <div className={optionDiv}>
        <div className={secondDiv}>
          <img src={matematia} className={logoStyle} alt="Logo" />
          <p className={descriptionText}>
            adipiscing elit. Morbi dapibus sem leo, ac volutpat orci fermentum ac. Integer a laoreet
          </p>
          <div className={buttonDiv}>
            <Button label="VER MÁS" />
          </div>
        </div>
        <img src={pencil} className={pencilDiv} alt="pencil" />
      </div>
    </div>
  );
};

export default MainAbout;

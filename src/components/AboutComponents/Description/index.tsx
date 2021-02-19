import React from 'react';
import { style } from 'typestyle';
import Button from '../../UI/Button';
import circles from '../../../assets/images/icons/landingPage/circles.svg';

const mainDiv = style({
  display: 'flex',
  padding: '5.5em 3em 2em 3em',
  justifyContent: 'space-around',
  width: '90%'
});

const textDiv = style({
  display: 'flex',
  flexFlow: 'column',
  width: '65%',
  justifyContent: 'space-between',
  alignSelf: 'center'
});

const mainText = style({
  fontSize: '2.4em',
  marginBottom: '1.2em'
});

const descriptionText = style({
  marginBottom: '1.8em'
});

const DescriptionAbout: React.FC = () => {
  return (
    <div className={mainDiv}>
      <div className={textDiv}>
        <h1 className={mainText}>PLATAFORMA CON 49 TEMAS MATEMÁTICOS Y MÁS DE 500 EJERCICIOS</h1>
        <p className={descriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus sem leo, ac
          volutpat orci fermentum ac. Integer a laoreet enim, a hendrerit dolor. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nulla leo turpis, lobortis nec volutpat quis,
          efficitur non nunc. Praesent id tempor dui. In et blandit mi
        </p>
        <div>
          <Button label="VER MÁS" />
        </div>
      </div>
      <div>
        <img src={circles} alt="circulos" />
      </div>
    </div>
  );
};

export default DescriptionAbout;

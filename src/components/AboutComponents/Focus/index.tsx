import React from 'react';
import { style } from 'typestyle';
import FocusCard from './focusCard';
import quality from '../../../assets/images/icons/landingPage/focusIcon/quality.svg';
import visibility from '../../../assets/images/icons/landingPage/focusIcon/visibility.svg';
import support from '../../../assets/images/icons/landingPage/focusIcon/support.svg';
import content from '../../../assets/images/icons/landingPage/focusIcon/content.svg';

const descriptionDummy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const mainDiv = style({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center'
});

const title = style({
  fontSize: '2.2em',
  marginBottom: '1em'
});

const cardDiv = style({
  display: 'flex',
  justifyContent: 'space-around',
  padding: '2em',
  width: '80%'
});

const FocusDivAbout: React.FC = () => {
  return (
    <div className={mainDiv}>
      <h1 className={title}>¿EN QUÉ NOS ENFOCAMOS?</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus sem leo, ac volutpat
        orci fermentum ac. Integer a laoreet enim, a hendrerit dolor. Lorem ipsum dolor sit amet,{' '}
      </p>
      <div className={cardDiv}>
        <FocusCard name="Calidad" description={descriptionDummy} icon={quality} />
        <FocusCard name="Disponibilidad" description={descriptionDummy} icon={visibility} />
        <FocusCard name="Soporte" description={descriptionDummy} icon={support} />
        <FocusCard name="Contenido" description={descriptionDummy} icon={content} />
      </div>
    </div>
  );
};

export default FocusDivAbout;

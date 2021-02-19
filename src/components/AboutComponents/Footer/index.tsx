import React from 'react';
import { style } from 'typestyle';
import message from '../../../assets/images/icons/landingPage/footer/message.svg';
import terms from '../../../assets/images/icons/landingPage/footer/terms.svg';
import privacy from '../../../assets/images/icons/landingPage/footer/privacy.svg';
import contact from '../../../assets/images/icons/landingPage/footer/contact.svg';

const sections = [
  { image: message, text: 'correo@matematia.com.mx' },
  { image: terms, text: 'Términos y condiciones' },
  { image: privacy, text: 'Aviso de privacidad' },
  { image: contact, text: 'Contáctanos' }
];

const footer = style({
  backgroundColor: '#3474B5',
  width: '100%',
  paddingTop: '3em',
  paddingBottom: '3em',
  display: 'flex',
  justifyContent: 'center'
});

const footerSectionDiv = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-around',
  width: '80%'
});

const footerSection = style({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  height: '4rem',
  justifyContent: 'space-around',
  color: 'white',
  fontSize: '1.2em'
});

const imageSection = style({
  width: '2em'
});

const FooterAbout: React.FC = () => {
  return (
    <div className={footer}>
      <div className={footerSectionDiv}>
        {sections.map((section) => (
          <div key={section.text} className={footerSection}>
            <img src={section.image} className={imageSection} alt={section.text} />
            <p>{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterAbout;

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { style } from 'typestyle';
import { useTranslation } from 'react-i18next';
import fondo from '../../assets/images/background/fondo_inicial.jpg';
import logo from '../../assets/logos/MATEMATIA.svg';
import Button from '../UI/Button';

const teal = '#7CE2C3';

const mainDiv = style({
  backgroundImage: `url(${fondo})`,
  backgroundSize: 'cover',
  backgroundColor: 'blue',
  height: '100vh',
  width: '100vw'
});

const panelDiv = style({
  backgroundColor: 'rgb(53,137,231,0.7)',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexFlow: 'column'
});

const imgStyle = style({
  width: '40%'
});

const logoDiv = style({
  display: 'flex',
  flexFlow: 'column',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
});

const underline = style({
  backgroundColor: teal,
  width: '60%',
  height: '0.5em'
});

const firstRow = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'flex-end',
  margin: '2em'
});

const aboutText = style({
  color: teal,
  fontSize: '1.2em',
  padding: '0.7em'
});

const loginText = style({
  border: `0.2em solid ${teal}`,
  color: 'white',
  fontSize: '1.2em',
  padding: '0.5em'
});

const descriptionDiv = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '3em',
  marginBottom: '5em'
});

const descriptionText = style({
  color: 'white',
  fontSize: '2em',
  width: '80%',
  textAlign: 'center'
});

const buttonDiv = style({
  display: 'flex',
  justifyContent: 'center'
});

const InitialScreen: React.FC = () => {
  const { t } = useTranslation();
  const [isLogin, setLogin] = useState(false);
  const [isAbout, setAbout] = useState(false);

  return (
    <div className={mainDiv}>
      {isLogin && <Redirect push to="/auth/login" />}
      {isAbout && <Redirect push to="/about" />}
      <div className={panelDiv}>
        <div className={firstRow}>
          <div className={aboutText} onClick={() => setAbout(true)}>
            {t('home.about')}
          </div>
          <div className={loginText} onClick={() => setLogin(true)}>
            {t('home.log')}
          </div>
        </div>
        <div className={logoDiv}>
          <img src={logo} className={imgStyle} alt="matematia" />
          <hr className={underline} />
        </div>
        <div className={descriptionDiv}>
          <p className={descriptionText}>{t('home.description')}</p>
        </div>
        <div className={buttonDiv}>
          <Button label={t('common.seeMore')} fontSize="1.2em" onClick={() => setAbout(true)} />
        </div>
      </div>
    </div>
  );
};

export default InitialScreen;

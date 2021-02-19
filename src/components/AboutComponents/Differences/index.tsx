import React from 'react';
import { style } from 'typestyle';
import lines from '../../../assets/images/background/lines.svg';
import team from '../../../assets/images/icons/landingPage/diferences/team.svg';
import game from '../../../assets/images/icons/landingPage/diferences/game.svg';
import artificial from '../../../assets/images/icons/landingPage/diferences/artificial.svg';
import check from '../../../assets/images/icons/landingPage/diferences/check.svg';
import education from '../../../assets/images/icons/landingPage/diferences/education.svg';
import video from '../../../assets/images/icons/landingPage/diferences/video.svg';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus sem leo, ac volutpat orci fermentum ac.';

const cards = [
  { item: team, title: 'Equipo de expertos', subtitle: lorem },
  { item: game, title: 'Elementos de gamificación', subtitle: lorem },
  { item: artificial, title: 'Inteligencia artificial', subtitle: lorem },
  { item: check, title: 'Contenido profesional', subtitle: lorem },
  { item: education, title: 'Herramienta útil', subtitle: lorem },
  { item: video, title: 'Contenido multimedia', subtitle: lorem }
];

const mainDiv = style({
  display: 'flex',
  flexFlow: 'column',
  width: '100%',
  backgroundColor: '#3474B5',
  backgroundImage: `url(${lines})`,
  alignItems: 'center',
  marginTop: '2em',
  marginBottom: '1em'
});

const title = style({
  color: 'white',
  fontSize: '2em',
  marginTop: '1em',
  marginBottom: '1em'
});

const cardDivSection = style({
  width: '80%',
  display: 'flex',
  flexFlow: 'row',
  flexWrap: 'wrap',
  marginBottom: '2em'
});

const cardDiv = style({
  backgroundColor: 'white',
  width: '30%',
  padding: '2%',
  margin: '1%',
  borderRadius: '2em'
});

const cardTitle = style({
  display: 'flex',
  flexFlow: 'row'
});

const titleCard = style({
  fontSize: '1.4em',
  marginLeft: '1em',
  fontWeight: 'bold'
});

const descriptionText = style({
  fontSize: '1.2em',
  marginTop: '1em'
});

const DifferencesAbout: React.FC = () => {
  return (
    <div className={mainDiv}>
      <h1 className={title}>LO QUE HACE A MATEMAT-IA DIFERENTE</h1>
      <div className={cardDivSection}>
        {cards.map((card, index) => (
          <div key={index} className={cardDiv}>
            <div className={cardTitle}>
              <img src={card.item} alt={card.title} />
              <p className={titleCard}>{card.title}</p>
            </div>
            <p className={descriptionText}>{card.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifferencesAbout;

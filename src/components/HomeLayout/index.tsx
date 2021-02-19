import React from 'react';
import { style } from 'typestyle';
import { withTranslation, WithTranslationProps } from 'react-i18next';
import TopicCard from '../TopicCard';
import Card from '../Card';
import Button from '../UI/Button';
import Ranking from '../Ranking';
import reglas from '../../assets/images/icons/reglas.svg';
import puntaje from '../../assets/images/icons/puntaje.svg';
import puntajeSemanal from '../../assets/images/icons/puntaje_semanal.svg';
import { Topic, Training } from '../../utils/types';
import back from '../../assets/images/background/PuntitosFondo.svg';

interface HomeLayoutProps {
  topic: Topic;
  users: string[];
  points: number[];
  training: Training | null;
}

const layoutDiv = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-around',
  paddingTop: '1.2em',
  backgroundImage: `url(${back})`
});

const firstColumn = style({
  display: 'flex',
  flexFlow: 'column',
  width: '65%'
});

const secondColumn = style({
  display: 'flex',
  flexFlow: 'column',
  width: '25%',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const missionDisplay = style({
  borderBottom: '4px solid #EFEAEA',
  fontSize: '2em',
  color: '#0071BC'
});

const HomeLayout: React.FC<HomeLayoutProps & WithTranslationProps> = ({
  topic,
  training,
  users,
  points,
  i18n
}) => {
  const space = (height = '1em') => <div style={{ height: height }} />;

  const seeMoreButton = (
    <Button
      label="VER"
      backgroundColor="#975CB1"
      shadowColor="#692DB0"
      minWidth="6em"
      margin="0.4em"
      width="50%"
      fontSize="0.8em"
    />
  );
  return (
    <div className={layoutDiv}>
      <div className={firstColumn}>
        <div className={missionDisplay}>
          {training ? i18n?.t('mission.continue') : i18n?.t('mission.new')}
        </div>
        {space()}
        <TopicCard
          isContinue={training !== null}
          topic={topic}
          percentage={
            training !== null ? (training.records.length / training.exercises.length) * 100 : 0
          }
        />
        {space('3em')}
      </div>
      <div className={secondColumn}>
        {space()}
        <Ranking
          users={[
            'Pepe',
            'Pablo',
            'Ana',
            'Andrea',
            'Joaquin',
            'Simurdiera',
            'Joan',
            'Capulina',
            'Viruta',
            'Marta'
          ]}
          points={[200, 198, 197, 195, 192, 188, 186, 180, 179, 178]}
          width="16em"
        />
        {space()}
        <Card imageIcon={puntaje} title="PUNTAJE TOTAL" subtitle="1580" width="16em" />
        {space()}
        <Card imageIcon={puntajeSemanal} title="PUNTAJE TOTAL" subtitle="180" width="16em" />
        {space()}
        <Card imageIcon={reglas} title="REGLAS Y USOS" width="16em" subtitle={seeMoreButton} />
        {space()}
      </div>
    </div>
  );
};

export default withTranslation()(HomeLayout);

import React from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation, WithTranslationProps } from 'react-i18next';
import { style } from 'typestyle';
import Button from '../UI/Button';
import ProgressBar from '../ProgressBar';
import { Topic } from '../../utils/types';
import getStorageUrl from '../../utils/storage';

interface TopicCardProps {
  topic: Topic;
  percentage: number;
  color?: string;
  shadowColor?: string;
  width?: string;
  isContinue: boolean;
}

const title = style({
  fontSize: '2em',
  color: '#0071BC'
});

const progressDiv = style({
  marginTop: '1em'
});

const progressTitle = style({
  fontSize: '1em',
  color: '#767676'
});

const row = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '0.5em'
});

const TopicCard: React.FC<TopicCardProps & WithTranslationProps> = ({
  topic,
  percentage,
  color = '#FBB03B',
  shadowColor = '#BC842C',
  isContinue,
  i18n
}) => {
  return (
    <div>
      <img src={getStorageUrl(topic.sceneImage as string)} alt={topic.country} />
      <h1 className={title}>{topic.name}</h1>
      <div className={progressDiv}>
        <span className={progressTitle}>PROGRESO ({percentage}%)</span>
        <div className={row}>
          <ProgressBar percentage={percentage} />
          <NavLink to={`/topic/${topic.id}`}>
            <Button
              label={
                isContinue
                  ? (i18n?.t('common.continueAdvcenture') as string)
                  : (i18n?.t('common.goNewAdventure') as string)
              }
              margin="1em 0"
              backgroundColor={color}
              shadowColor={shadowColor}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(TopicCard);

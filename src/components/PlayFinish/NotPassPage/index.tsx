import React from 'react';
import { i18n } from 'i18next';
import { style } from 'typestyle';
import { styles } from '../styles';
import { platformColors, inactiveColor } from '../../../constants/colors';
import Button from '../../UI/Button';
import lines from '../../../assets/images/background/lines.svg';
import { Topic } from '../../../utils/types';
import PlayTitle from '../../PlayTitle';
import SimpleImage from '../SimpleImage';
import NotPassOne from '../NotPassOne';
import Carrousel from '../Carrousel';

interface NotPassPageProps {
  selectedHelp: number;
  needTopic: Topic;
  possibleTopics: Topic[];
  selected: number;
  isFinishLoading: boolean;
  repeted: number;
  i18n: i18n | undefined;
  getImageUrl: (value: string) => string;
  setSelectedHelp: (value: number) => void;
  changeSelected: (value: number) => void;
  redirect: () => void;
}

const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingTop: '2em',
  paddingBottom: '2em',
  height: '94vh',
  backgroundSize: 'cover, 600vh',
  backgroundImage: `url(${lines})`,
  backgroundColor: platformColors.main
});

const NotPassPage: React.FC<NotPassPageProps> = ({
  selectedHelp,
  needTopic,
  possibleTopics,
  selected,
  isFinishLoading,
  repeted,
  i18n,
  getImageUrl,
  setSelectedHelp,
  changeSelected,
  redirect
}) => {
  return isFinishLoading ? (
    <div>Cargando</div>
  ) : (
    <div className={container}>
      {((selectedHelp >= 0 && needTopic.resources[selectedHelp].kind === 'web') ||
        selectedHelp < 0) && (
        <PlayTitle
          title={possibleTopics.length > 0 ? possibleTopics[selected].name : needTopic.name}
        />
      )}
      {repeted >= 2 ? (
        <Carrousel
          possibleTopics={possibleTopics}
          selected={selected}
          changeSelected={changeSelected}
          getImageUrl={getImageUrl}
        />
      ) : repeted === 1 ? (
        <NotPassOne
          needTopic={needTopic}
          i18n={i18n}
          selectedHelp={selectedHelp}
          setSelectedHelp={setSelectedHelp}
        />
      ) : (
        <SimpleImage currentImage={getImageUrl(needTopic.id)} />
      )}
      {((selectedHelp >= 0 && needTopic.resources[selectedHelp].kind !== 'bibliografy') ||
        selectedHelp < 0) && (
        <p className={styles.notPassText}>
          {i18n?.t(`result_6${repeted === 0 ? 'a' : repeted === 1 ? 'b' : 'c'}`)}
        </p>
      )}
      <Button
        label={i18n?.t('mission.accept') as string}
        fontSize="1.2em"
        onClick={repeted === 1 && selectedHelp === -2 ? () => null : redirect}
        backgroundColor={repeted === 1 && selectedHelp === -2 ? inactiveColor.primary : undefined}
        shadowColor={repeted === 1 && selectedHelp === -2 ? inactiveColor.shadow : undefined}
      />
    </div>
  );
};

export default NotPassPage;

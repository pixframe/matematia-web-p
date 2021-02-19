import React from 'react';
import { styles } from '../styles';
import arrowImg from '../../../assets/images/UI/flechaAtras.svg';
import { Topic } from '../../../utils/types';
import { i18n } from 'i18next';
import VideoPlayer from '../../VideoPlayer';
import CardGrid from '../CardGrid';

interface NotPassOneProps {
  needTopic: Topic;
  selectedHelp: number;
  i18n: i18n | undefined;
  setSelectedHelp: (value: number) => void;
}

const NotPassOne: React.FC<NotPassOneProps> = ({
  needTopic,
  selectedHelp,
  i18n,
  setSelectedHelp
}) => {
  return needTopic.resources[selectedHelp]?.kind === 'web' || selectedHelp < 0 ? (
    <CardGrid i18n={i18n} needTopic={needTopic} setSelectedHelp={setSelectedHelp} />
  ) : (
    <div className={styles.videoDiv}>
      <img
        src={arrowImg}
        className={styles.videoImg}
        onClick={() => setSelectedHelp(-1)}
        alt="arrow"
      />
      {needTopic.resources[selectedHelp]?.kind === 'video' ? (
        <VideoPlayer videoId={needTopic.resources[selectedHelp].link} width="650" height="362" />
      ) : (
        <div className={styles.boooksDiv}>
          <h1 className={styles.booksTitle}>{i18n?.t('resources.bibliografy')}</h1>
          {needTopic.resources
            .filter((resources) => resources.kind === 'bibliografy')
            .map((resource, index) => (
              <h1 key={`book_${index}`} className={styles.booksInfo}>
                {`•  ${resource.label}`}
              </h1>
            ))}
        </div>
      )}
      <div className={arrowImg} />
    </div>
  );
};

export default NotPassOne;

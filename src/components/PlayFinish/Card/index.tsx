import React from 'react';
import { i18n } from 'i18next';
import { styles } from '../styles';
import video from '../../../assets/images/icons/result/video.svg';
import web from '../../../assets/images/icons/result/web.svg';
import books from '../../../assets/images/icons/result/books.svg';
import { Resource } from '../../../utils/types';

interface CardProps {
  i18n: i18n | undefined;
  resource: Resource;
  index: number;
  setSelectedHelp: (value: number) => void;
}

const Card: React.FC<CardProps> = ({ i18n, resource, index, setSelectedHelp }) => {
  const inCard = (
    <>
      <img
        className={styles.cardImg}
        src={resource.kind === 'video' ? video : resource.kind === 'web' ? web : books}
        alt={resource.kind}
      />
      <p className={styles.cardText}>{i18n?.t(`resources.${resource.kind}`)}</p>
    </>
  );
  return (
    <div className={styles.card} onClick={() => setSelectedHelp(index)} key={resource.link}>
      {resource.kind === 'web' ? (
        <a href={resource.link} target="blank" className={styles.cardRef}>
          {inCard}
        </a>
      ) : (
        inCard
      )}
    </div>
  );
};

export default Card;

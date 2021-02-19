import React from 'react';
import { Topic } from '../../../utils/types';
import { styles } from '../styles';
import carrouselImg from '../../../assets/images/icons/result/carrousel_arrow.svg';

interface CarrouselProps {
  possibleTopics: Topic[];
  selected: number;
  changeSelected: (value: number) => void;
  getImageUrl: (value: string) => string;
}

const Carrousel: React.FC<CarrouselProps> = ({
  possibleTopics,
  selected,
  changeSelected,
  getImageUrl
}) => {
  return (
    <div className={styles.carrosuselDiv}>
      <img
        src={carrouselImg}
        style={{ transform: 'scaleX(-1)' }}
        onClick={() => changeSelected(-1)}
        alt="previous"
      />
      <img
        src={getImageUrl(possibleTopics[selected === 0 ? 2 : selected - 1]?.id as string)}
        className={styles.backImg}
        style={{ right: '40%' }}
        onClick={() => changeSelected(-1)}
        alt="topic"
      />
      <div className={styles.imgPrevious}>
        <img src={getImageUrl(possibleTopics[selected]?.id as string)} alt="selected topic" />
      </div>
      <img
        src={getImageUrl(possibleTopics[selected === 2 ? 0 : selected + 1]?.id as string)}
        className={styles.backImg}
        style={{ left: '40%' }}
        onClick={() => changeSelected(1)}
        alt="topic"
      />
      <img onClick={() => changeSelected(1)} src={carrouselImg} alt="next" />
    </div>
  );
};

export default Carrousel;

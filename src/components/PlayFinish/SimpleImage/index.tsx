import React from 'react';
import { styles } from '../styles';

interface SimpleImageProps {
  currentImage: string;
}

const SimpleImage: React.FC<SimpleImageProps> = ({ currentImage }) => {
  return (
    <div className={styles.imgPrevious}>
      <img src={currentImage} alt="previous" />
    </div>
  );
};

export default SimpleImage;

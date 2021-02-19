import React from 'react';
import { style } from 'typestyle';
import styles from './style';

interface DisplayDivProps {
  label: string;
  image?: string;
  contrastColor?: string;
  labelColor?: string;
}

const DisplayDiv: React.FC<DisplayDivProps> = ({
  image,
  label,
  contrastColor = '#405481',
  labelColor = 'white'
}) => {
  const contrastColorClass = style({
    backgroundColor: contrastColor
  });

  return (
    <div className={[styles.displayDiv, contrastColorClass].join(' ')}>
      <div style={{ flexGrow: 4 }}></div>
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} className={styles.imageClass} alt={label} />
        </div>
      )}
      <div style={{ flexGrow: 1 }}></div>
      <div className={styles.displayLabel}>
        <span style={{ margin: 'auto', width: '100%', color: labelColor }}>{label}</span>
      </div>
      <div style={{ flexGrow: 8 }}></div>
    </div>
  );
};

export default DisplayDiv;

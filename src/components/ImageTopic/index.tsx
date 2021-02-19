import React from 'react';
import { style } from 'typestyle';
import flecha from '../../assets/images/UI/flechaAtras.svg';

interface ImageTopicProps {
  image: string;
  accentColor: string;
  title: string;
  subtitle: string;
  titleColor?: string;
  subtitleColor?: string;
  onArrowClick?: () => void;
  height?: string;
  minHeight?: string;
  needBack?: boolean;
  titleFontSize?: string;
  subtitleFontSize?: string;
  className?: string;
}

const size = style({
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-end'
});

const titleDiv = style({
  margin: '5em 0',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center'
});

const arrowImage = style({
  width: '3.5em',
  height: '3.5em',
  margin: '1em'
});

const ImageTopic: React.FC<ImageTopicProps> = ({
  image,
  accentColor,
  title,
  subtitle,
  titleColor = '#ffffff',
  subtitleColor = '#000000',
  onArrowClick,
  height = '100%',
  minHeight,
  needBack,
  titleFontSize = '3em',
  subtitleFontSize = '1.6em',
  className
}) => {
  const backGroundStyle = style({
    backgroundImage: `url(${image})`,
    height: height,
    minHeight: minHeight,
    width: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    backgroundPositionY: 'center'
  });

  const sizedBox = style({
    height: '0.8em',
    width: '100%',
    backgroundColor: `${accentColor}`
  });

  const titleText = style({
    color: titleColor,
    fontSize: titleFontSize,
    fontWeight: 'bold'
  });

  const subtitleText = style({
    color: subtitleColor,
    maxWidth: 'fit-content',
    fontSize: subtitleFontSize
  });

  return (
    <div className={[backGroundStyle, className].join(' ')}>
      {needBack && (
        <div>
          <img src={flecha} className={arrowImage} onClick={onArrowClick} alt={title} />
        </div>
      )}
      <div className={size}>
        <div className={titleDiv}>
          <p className={titleText}>{title.toLocaleUpperCase()}</p>
          <div className={sizedBox}></div>
          <p className={subtitleText}>{subtitle.toLocaleUpperCase()}</p>
        </div>
      </div>
      <div />
    </div>
  );
};

export default ImageTopic;

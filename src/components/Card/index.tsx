import React from 'react';
import { style } from 'typestyle';

interface CardProps {
  imageIcon: string;
  title: string;
  subtitle?: string | React.ReactNode;
  width?: string;
  className?: string;
  onPressed?: () => void;
  iconSize?: string;
  children?: React.ReactNode;
}

const card = style({
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2);',
  borderRadius: '0.4em',
  padding: '0.6em',
  backgroundColor: 'white',
  display: 'flex',
  flexFlow: 'row',
  minWidth: '15em',
  width: 'fit-content',
  justifyContent: 'space-around'
});

const column = style({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const titleLabel = style({
  fontSize: '1em',
  textAlign: 'center',
  fontWeight: 'bold'
});

const subtitleLabel = style({
  fontSize: '1.4em',
  textAlign: 'center',
  color: '#3589E7'
});

const Card: React.FC<CardProps> = ({
  imageIcon,
  title,
  subtitle,
  className,
  onPressed,
  width,
  iconSize = '4em',
  children
}) => {
  return (
    <div className={[className, card].join(' ')} onClick={onPressed} style={{ width: width }}>
      <img src={imageIcon} style={{ width: iconSize, height: iconSize }} alt={titleLabel} />
      <div className={column}>
        <span className={titleLabel}>{title}</span>
        {subtitle && typeof subtitle === 'string' ? (
          <span className={subtitleLabel}>{subtitle}</span>
        ) : (
          subtitle
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;

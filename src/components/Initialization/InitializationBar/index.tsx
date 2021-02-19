import React from 'react';
import { style } from 'typestyle';
import { platformColors } from '../../../constants/colors';
import back from '../../../assets/images/icons/back.svg';
interface InitializationBarProps {
  title: string;
  canGoBack?: boolean;
  onGoBack?: () => void;
}

const barStyle = style({
  backgroundColor: platformColors.main,
  fontSize: '2em',
  display: 'flex',
  justifyContent: 'center',
  padding: '0.2em',
  marginBottom: '3%',
  color: platformColors.titleColor
});

const barDiv = style({
  width: '90%',
  display: 'flex',
  justifyContent: 'space-between'
});

const InitializationBar: React.FC<InitializationBarProps> = ({
  title,
  canGoBack = false,
  onGoBack = () => {}
}) => {
  return (
    <div className={barStyle}>
      <div className={barDiv}>
        {canGoBack ? <img src={back} alt="atras" height="100%" onClick={onGoBack} /> : <p></p>}
        <p>{title}</p>
        <p></p>
      </div>
    </div>
  );
};

export default InitializationBar;

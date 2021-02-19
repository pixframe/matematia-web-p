import React from 'react';
import { style } from 'typestyle';
import { useTranslation } from 'react-i18next';
import professor from '../../../assets/images/avatars/professor.svg';
import student from '../../../assets/images/avatars/alumno.svg';
import InteractiveCard from '../../UI/InteractiveCard';
import { platformColors } from '../../../constants/colors';

const sectionDiv = style({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  flexFlow: 'column'
});

const interactiveDiv = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between',
  width: '80%'
});

const cardTitle = style({
  color: platformColors.titleColor,
  fontSize: '3em'
});

const description = style({
  fontSize: '1.8em',
  fontWeight: 'bold',
  width: '70%',
  marginBottom: '1em'
});

const avatarStyle = style({
  height: '4em'
});

interface KindOfAccountProps {
  onSelectCard: (kind: 'teacher' | 'student') => void;
}

const KindOfAccount: React.FC<KindOfAccountProps> = ({ onSelectCard }) => {
  const { t } = useTranslation();
  const UserCard: (label: string, kindOfUser: 'teacher' | 'student') => React.ReactNode = (
    label,
    kindOfUser
  ) => {
    return (
      <InteractiveCard onClick={() => onSelectCard(kindOfUser)}>
        <div className={interactiveDiv}>
          <img
            src={kindOfUser === 'teacher' ? professor : student}
            alt="avatar"
            className={avatarStyle}
          />
          <p className={cardTitle}>{label}</p>
          <div />
        </div>
      </InteractiveCard>
    );
  };
  return (
    <div className={sectionDiv}>
      <p className={description}>{t('new.kindDescription')}</p>
      {UserCard(t('new.kindTeacher'), 'teacher')}
      {UserCard(t('new.kindStudent'), 'student')}
    </div>
  );
};

export default KindOfAccount;

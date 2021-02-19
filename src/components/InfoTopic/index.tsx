import React from 'react';
import { NavLink } from 'react-router-dom';
import { style } from 'typestyle';
import Button from '../../components/UI/Button';
import SubtopicRow from '../../components/SubtopicRow';
import puntos from '../../assets/images/background/PuntitosFondo.svg';

interface InfoTopicProps {
  title: string;
  history: string;
  subtopics: string[];
  primaryColor?: string;
  primaryColorAccent?: string;
  secondaryColor?: string;
  secondaryColorAccent?: string;
}

const InfoTopic: React.FC<InfoTopicProps> = ({
  title,
  history,
  subtopics,
  primaryColor = '#0071BC',
  primaryColorAccent = '#275388',
  secondaryColor = '#FBB03B',
  secondaryColorAccent = '#BC842C'
}) => {
  const infoClass = style({
    width: '50%',
    padding: '4%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    backgroundImage: `url(${puntos})`,
    backgroundSize: 'cover'
  });

  const titleText = style({
    color: primaryColor,
    fontSize: '1.8em',
    fontWeight: 'bold',
    marginBottom: '5%'
  });

  const historyText = style({
    fontSize: '1em',
    marginBottom: '5%',
    textAlign: 'justify'
  });

  const knowledgeText = style({
    fontSize: '1.2em',
    fontStyle: 'italic',
    color: primaryColor
  });

  const buttonRow = style({
    display: 'flex',
    justifyContent: 'space-around'
  });

  return (
    <div className={infoClass}>
      <div>
        <div className={titleText}>{title.toLocaleUpperCase()}</div>
        <div className={historyText}>{history.toLocaleUpperCase()}</div>
      </div>
      <div className={knowledgeText}> CONOCIMIENTOS NECESARIOS PARA ESTA MISIÓN</div>
      <div>
        {subtopics.map((subtopic, index) => {
          return <SubtopicRow key={subtopic} subtopic={subtopic} index={index + 1} />;
        })}
      </div>
      <div className={buttonRow}>
        <Button
          backgroundColor={primaryColor}
          shadowColor={primaryColorAccent}
          label="Repasar"
          fontSize="1.2em"
        />
        <NavLink to={`/play/${title}/${subtopics.join('&')}`} style={{ display: 'flex' }}>
          <Button
            backgroundColor={secondaryColor}
            shadowColor={secondaryColorAccent}
            label="Comenzar"
            fontSize="1.2em"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default InfoTopic;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { style } from 'typestyle';
import ProgressBar from '../ProgressBar';
import Button from '../UI/Button';
import { Topic } from '../../utils/types';
import getStorageUrl from '../../utils/storage';
import back from '../../assets/images/icons/blueBack.svg';
import background from '../../assets/images/background/PuntitosFondo.svg';
import cityIcon from '../../assets/images/icons/country/city.svg';
import countryIcon from '../../assets/images/icons/country/country.svg';

interface TopicPageProps {
  topic: Topic | null;
}

const mainDiv = style({
  display: 'flex',
  minHeight: '92.5vh',
  flexFlow: 'column',
  alignItems: 'center',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover'
});

const topicHomeStyle = style({
  display: 'flex',
  flexFlow: 'row',
  width: '90%',
  justifyContent: 'space-between'
});

const titleDiv = style({
  marginTop: '3em',
  marginBottom: '1em',
  display: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  width: '90%',
  padding: '1em',
  borderBottom: '0.3em solid #EFEAEA'
});

const backImg = style({
  marginRight: '2em'
});

const imgContainer = style({
  padding: '2%',
  backgroundColor: '#32659D'
});

const title = style({
  fontSize: '2.4em'
});

const progressLabel = style({
  fontSize: '1.2em',
  marginTop: '1em',
  marginBottom: '0.5em'
});

const imageDiv = style({
  width: '58%'
});

const infoDiv = style({
  width: '38%'
});

const countryInfo = style({
  display: 'flex',
  flexFlow: 'row',
  width: '100%'
});

const countryData = style({
  display: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  marginBottom: '2em'
});

const countryLabel = style({
  fontSize: '1.4em',
  margin: '0 0.4em'
});

const subtopicRow = style({
  display: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  marginTop: '0.2em',
  marginBottom: '0.3em'
});

const circleDiv = style({
  display: 'flex',
  justifyContent: 'center',
  width: '2em',
  height: '2em',
  color: 'white',
  backgroundColor: '#3589E7',
  borderRadius: '50%',
  alignItems: 'center',
  marginRight: '1em'
});

const subStyle = style({
  color: '#3589E7',
  fontSize: '1.2em',
  marginTop: '1em',
  marginBottom: '1em',
  fontStyle: 'italic'
});

const buttonDiv = style({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-around',
  alignItems: 'center'
});

const TopicPage: React.FC<TopicPageProps> = ({ topic }) => {
  return (
    <div className={mainDiv}>
      <div className={titleDiv}>
        <NavLink to={`/`}>
          <img src={back} alt="back" className={backImg} />
        </NavLink>
        <p className={title}>{topic?.name}</p>
      </div>
      <div className={topicHomeStyle}>
        <div className={imageDiv}>
          <div className={imgContainer}>
            <img src={getStorageUrl(topic?.sceneImage as string)} alt={topic?.country} />
          </div>
          <p className={progressLabel}>Progreso (0%)</p>
          <ProgressBar percentage={5} />
        </div>
        <div className={infoDiv}>
          <div className={countryInfo}>
            <div className={countryData} style={{ marginRight: '1.4em' }}>
              <img src={cityIcon} alt="city" />
              <p className={countryLabel}>{topic?.city}</p>
            </div>
            <div className={countryData}>
              <img src={countryIcon} alt="city" />
              <p className={countryLabel}>{topic?.country}</p>
            </div>
          </div>
          <p>{topic?.description}</p>
          <p className={subStyle}>CONOCIMIENTOS NECESARIOS PARA ESTA MISIÓN</p>
          {topic?.subtopicNames.map((subtopic, index) => (
            <div key={subtopic} className={subtopicRow}>
              <div className={circleDiv}>
                <p>{index + 1}</p>
              </div>
              <p>{subtopic}</p>
            </div>
          ))}
          <div className={buttonDiv}>
            <NavLink to={`/blog/${topic?.id}`}>
              <Button label="REPASAR" backgroundColor="#3589E7" shadowColor="#215188" />
            </NavLink>
            <NavLink to={`/play/${topic?.id}/${topic?.subtopics.join('&')}/${topic?.code}`}>
              <Button label="COMENZAR" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;

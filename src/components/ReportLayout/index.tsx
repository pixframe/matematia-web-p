import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../Card';
import { Training } from '../../utils/types';
import avatar from '../../assets/images/avatars/avatar_8.svg';
import total from '../../assets/images/icons/puntaje.svg';
import semanal from '../../assets/images/icons/puntaje_semanal_reporte.svg';
import aprovados from '../../assets/images/icons/temas_aprovados.svg';
import reactivos from '../../assets/images/icons/reactivos_resueltos.svg';
import back from '../../assets/images/UI/back_blue_arrow.svg';
import next from '../../assets/images/UI/next_blue_arrow.svg';
import { styles } from './style';

interface ReportLayoutProps {
  points: number;
  weekPoints: number;
  aproved: number;
  totalQuestions: number;
  page: number;
  numOfPages: number;
  sizeOfPage: number;
  reports: Training[];
  name: string;
  userName: string;
  institute: string;
  nextPage?: () => void;
  previosPage?: () => void;
  selectedIndex: (arg0: number) => void;
}

const ReportLayout: React.FC<ReportLayoutProps> = ({
  points,
  weekPoints,
  aproved,
  totalQuestions,
  page,
  numOfPages,
  sizeOfPage,
  reports,
  name,
  userName,
  institute,
  nextPage,
  previosPage,
  selectedIndex
}) => {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.topDisplay}>
        <NavLink to="/perfil">
          <img className={styles.returnIcon} src={back} alt={'atras'} />
        </NavLink>
        <div className={styles.profileDiv}>
          <img className={styles.profileImage} src={avatar} alt="avatar" />
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>{name}</div>
            <div className={styles.profileUsername}>{userName}</div>
            <div className={styles.profileUsername}>{institute}</div>
          </div>
        </div>
        <div style={{ width: '10%' }} />
      </div>
      <div className={styles.cardDiv}>
        <Card imageIcon={total} subtitle={points.toString()} iconSize="5em" title="PUNTAJE TOTAL" />
        <Card
          imageIcon={semanal}
          subtitle={weekPoints.toString()}
          iconSize="5em"
          title="PUNTAJE SEMANAL"
        />
        <Card
          imageIcon={aprovados}
          subtitle={aproved.toString()}
          iconSize="5em"
          title="TEMAS APROBADOS"
        />
        <Card
          imageIcon={reactivos}
          subtitle={totalQuestions.toString()}
          iconSize="5em"
          title="REACTIVOS RESUELTOS"
        />
      </div>
      <div className={styles.reports}>
        <table className={styles.reportsTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>NOMBRE DEL TEMA</th>
              <th>STATUS</th>
              <th>FECHA</th>
            </tr>
          </thead>
          <div style={{ height: '1.2em' }} />
          <tbody>
            {reports.map((report, index) => {
              return (
                <tr key={`report${index}${report}`}>
                  <th>{index + page * sizeOfPage + 1}</th>
                  <th onClick={() => selectedIndex(index + page * sizeOfPage)}>
                    {report.topicName.toLocaleUpperCase()}
                  </th>
                  <th>
                    {report.records.filter((record) => record.result === 'correct').length /
                      report.exercises.length >
                    0.7
                      ? 'Aprobado'
                      : 'Reprobado'}
                  </th>
                  <th></th>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.pagination}>
          {page > 0 ? (
            <img
              src={back}
              className={styles.paginationIconSize}
              alt="anterior"
              onClick={previosPage}
            />
          ) : (
            <div className={styles.paginationIconSize} />
          )}
          <span>
            PÁGINA {page + 1}/{numOfPages}
          </span>
          {page < numOfPages - 1 ? (
            <img
              src={next}
              className={styles.paginationIconSize}
              alt="proximo"
              onClick={nextPage}
            />
          ) : (
            <div className={styles.paginationIconSize} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportLayout;

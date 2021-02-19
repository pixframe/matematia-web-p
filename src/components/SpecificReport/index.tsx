import React from 'react';
import { styles } from './style';
import { Training, ExerciseTypeNames } from '../../utils/types';
import back from '../../assets/images/UI/back_blue_arrow.svg';
import total from '../../assets/images/icons/Reporte2_TiempoTotal.svg';
import fecha from '../../assets/images/icons/Reporte2_FechaDeRealizacion.svg';
import aprovados from '../../assets/images/icons/Reporte2_TotalDeAciertos.svg';
import errores from '../../assets/images/icons/Reporte2_TotalDeErrores.svg';
import Card from '../Card';

interface SpecificReportProps {
  training: Training;
  clearIndex: () => void;
}

const SpecificReport: React.FC<SpecificReportProps> = ({ training, clearIndex }) => {
  const correctName = (kindOf: ExerciseTypeNames) => {
    switch (kindOf) {
      case 'closedAnswer':
        return 'PREGUNTA ABIERTA';
      case 'columns':
        return 'RELACIÓN DE COLUMNAS';
      case 'multipleChoice':
        return 'OPCIÓN MÚLTIPLE';
      case 'trueFalse':
        return 'VERDADERO/FALSO';
    }
  };

  return (
    <div className={styles.mainLayout}>
      <div className={styles.topDisplay}>
        <img className={styles.returnIcon} src={back} alt={'atras'} onClick={clearIndex} />
        <div className={styles.titleInfo}>
          <div className={styles.titleName}>{training.topicName}</div>
        </div>
        <div style={{ width: '10%' }} />
      </div>
      <div className={styles.cardDiv}>
        <Card
          imageIcon={fecha}
          subtitle={'19/10/2020'}
          iconSize="5em"
          title="FECHA DE REALIZACIÓN"
        />
        <Card
          imageIcon={total}
          subtitle={training.trainingTime.toString()}
          iconSize="5em"
          title="TIEMPO TOTAL"
        />
        <Card
          imageIcon={aprovados}
          subtitle={training.records
            .filter((report) => report.result === 'correct')
            .length.toString()}
          iconSize="5em"
          title="TOTAL DE ACIERTOS"
        />
        <Card
          imageIcon={errores}
          subtitle={training.records
            .filter((report) => report.result !== 'correct')
            .length.toString()}
          iconSize="5em"
          title="TOTAL DE ERRORES"
        />
        {/* <Card
          imageIcon={reactivos}
          subtitle={`${training.records.length}/${training.exercises.length}`}
          iconSize="5em"
          title="TOTAL DE REACTIVOS RESUELTOS"
        /> */}
      </div>
      <div className={styles.reports}>
        <table className={styles.reportsTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>ID DE LA PREGUNTA</th>
              <th>TIPO DE REACTIVO</th>
              <th>RESULTADO</th>
              <th>TIEMPO DE RESOLUCIÓN</th>
              <th>AYUDA</th>
            </tr>
          </thead>
          <div style={{ height: '1.2em' }} />
          <tbody>
            {training.records.map((record, index) => {
              return (
                <tr key={`report${index}${record}`}>
                  <th>{index + 1}</th>
                  <th>{record.exerciseId.toLocaleUpperCase()}</th>
                  <th>{correctName(record.exerciseType)}</th>
                  <th>{record.result === 'correct' ? 'Correcto' : 'Incorrecto'}</th>
                  <th>{record.answerFinishTime}</th>
                  <th>NO</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecificReport;

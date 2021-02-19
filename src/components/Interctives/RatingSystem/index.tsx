import React, { useState } from 'react';
import { style } from 'typestyle';
import styles from '../AnswerModal/styles';
import RatingIcon from './RatingIcon';
import { ReactComponent as Happy } from '../../../assets/images/Happy_Color-03.svg';
import { ReactComponent as HappyG } from '../../../assets/images/Happy_Gray-03.svg';
import { ReactComponent as Meh } from '../../../assets/images/Meh_Color-03.svg';
import { ReactComponent as MehG } from '../../../assets/images/Meh_Gray-03.svg';
import { ReactComponent as Sad } from '../../../assets/images/Sad_Color-03.svg';
import { ReactComponent as SadG } from '../../../assets/images/Sad_Gray-03.svg';
import Button from '../../UI/Button';
import ButtonsContainer from '../../Button/ButtonsContainer';
import InputTextArea from '../../Input/InputTextarea';

const container = style({
  padding: '2em',
  width: '100%'
});

const wrapper = style({
  width: '100%',
  padding: '2em 0 3em 0',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center'
});

const inputSize = style({
  fontSize: '1.3em',
  width: '60%'
});

const extraInfoContainer = style({
  display: 'flex',
  alignItems: 'center',
  flexFlow: 'column'
});

const answerLabel = style({
  fontSize: '2.2em',
  fontWeight: 'bold',
  display: 'flex',
  verticalAlign: 'middle',
  textAlign: 'start',
  width: '80%',
  color: 'white',
  justifyContent: 'center',
  margin: '1em',
  alignSelf: 'center'
});

const messageDiv = style({
  display: 'flex',
  justifyContent: 'space-around',
  flexFlow: 'row',
  width: '100%',
  maxHeight: '5em'
});

interface Props {
  onSend: (rating: number) => void;
  contrastColor?: string;
}

const RatingModal: React.FC<Props> = ({ onSend, contrastColor = '#405481' }) => {
  const contrastColorClass = style({
    backgroundColor: contrastColor
  });

  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const size = '128';

  return (
    <div className={styles.answerContainer}>
      <div className={[messageDiv, contrastColorClass].join(' ')}>
        <div className={answerLabel}>
          <span>¿QUÉ TE PARECIERON ESTOS EJERCICIOS?</span>
        </div>
      </div>
      <div className={container}>
        <div className={wrapper}>
          <RatingIcon click={() => setAmount(1)} selected={amount === 1}>
            <Sad height={size} />
            <SadG height={size} />
          </RatingIcon>
          <RatingIcon click={() => setAmount(2)} selected={amount === 2}>
            <Meh height={size} />
            <MehG height={size} />
          </RatingIcon>
          <RatingIcon click={() => setAmount(3)} selected={amount === 3}>
            <Happy height={size} />
            <HappyG height={size} />
          </RatingIcon>
        </div>
        {amount > 0 && (
          <div className={extraInfoContainer}>
            <InputTextArea
              id="textRating"
              value={message}
              onChange={(text) => setMessage(text)}
              placeholder="ESCRIBE AQUÍ TUS COMENTARIOS"
              containerClassname={inputSize}
              rows={5}
            />
            <ButtonsContainer>
              <Button label="Enviar calificación" onClick={() => onSend(amount)} fontSize="1.5em" />
            </ButtonsContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingModal;

import {
  FormHandlerChildrenProps,
  GridContainer,
  InputText,
  Button
} from '@calderaro/react-toolbox';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { style } from 'typestyle';
import { CreateLinkFormState } from '../../services/links';
import { localButton } from '../../styles/buttons';

export const container = style({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: '100%'
});

const title = style({
  fontSize: '1.4em',
  textAlign: 'center',
  width: '100%',
  marginBottom: '1em',
  fontWeight: 'bold',
  color: '#777'
});

const text = style({
  fontSize: '1.2em',
  textAlign: 'center',
  width: '100%',
  color: '#777'
});

const message = style({
  textAlign: 'center',
  color: '#2AB170',
  height: '2em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '1.5em'
});

const errorMap: Record<string, string> = {
  'invalid-viewer': 'Nombre de usuario invalido',
  'user-and-viewer-cannot-be-same': 'No puedes vincularte a ti mismo',
  'user-not-found': 'No se encontró el usuario',
  'already-exists': 'El usuario ya está vinculado'
};

const UserLink: React.FC<FormHandlerChildrenProps<CreateLinkFormState>> = (props) => {
  const { state, create, onChange } = props;

  return (
    <div className={container}>
      <h2 className={title}>VINCULAR CON UN PROFESOR</h2>
      <p className={text}>
        Para vincular tus datos con un profesor, escribe su correo y espera su confirmación para
        poder hacer de manera exitosa la vinculación
      </p>

      <GridContainer columns="1fr" padding="2.5em 0 0 0">
        <InputText
          label="Nombre de usuario del profesor"
          value={state.data.username}
          onChange={(value) => onChange(value, 'username')}
          error={state.error ? errorMap[state.error.message] || 'Error inesperado' : ''}
        />
      </GridContainer>

      <Button buttonClassname={localButton} onClick={create}>
        {state.status === 'creating' ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Vincular'}
      </Button>
      <div className={message}>
        {state.status === 'created' ? 'Usuario vinculado con éxito' : null}
      </div>
    </div>
  );
};

export default UserLink;

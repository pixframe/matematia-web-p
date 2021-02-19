import React from 'react';
import {
  Button,
  CustomError,
  FlexContainer,
  FormHandlerChildrenProps,
  GridContainer,
  InputSelect,
  InputText
} from '@calderaro/react-toolbox';
import { Profile } from '../../utils/types';
import { entities } from '../../constants/entities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';
import { grades } from '../../constants/grades';

const ProfileForm: React.FC<FormHandlerChildrenProps<Profile>> = (formHandlerProps) => {
  const { state, create, onChange } = formHandlerProps;
  const error = state.error as CustomError | null;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>MI PERFIL</h2>
        <FlexContainer>
          <div className={styles.message}>{state.status === 'created' ? 'Guardado!' : ''}</div>
          <Button onClick={create}>
            {state.status === 'creating' ? <FontAwesomeIcon icon={faSpinner} spin /> : 'GUARDAR'}
          </Button>
        </FlexContainer>
      </div>
      <GridContainer columns="1fr">
        <InputText
          label="Nombre"
          value={state.data.firstName}
          onChange={(value) => onChange(value, 'firstName')}
          error={error?.getError('firstName')}
        />
        <InputText
          label="Apellido"
          value={state.data.lastName}
          onChange={(value) => onChange(value, 'lastName')}
          error={error?.getError('lastName')}
        />
        <InputText
          label="Nombre de usuario"
          value={state.data.username}
          onChange={(value) => onChange(value, 'username')}
          error={error?.getError('username')}
        />
        <InputSelect
          label="Grado Escolar"
          value={state.data.grade}
          onChange={(value) => onChange(value, 'grade')}
          options={grades}
          error={error?.getError('grade')}
        />
        <InputText
          label="Institución Académica"
          value={state.data.institution}
          onChange={(value) => onChange(value, 'institution')}
          error={error?.getError('institution')}
        />
        <InputSelect
          label="Entidad"
          value={entities.find((item) => item.value === state.data.entity)?.label}
          onChange={(value) => onChange(value, 'entity')}
          options={entities}
          error={error?.getError('entity')}
        />
      </GridContainer>
    </div>
  );
};

export default ProfileForm;

import React from 'react';
import { FormHandlerChildrenProps } from '@calderaro/react-toolbox';
import InputText from '../Input/InputText';
import InputTextarea from '../Input/InputTextarea';
import { Subtopic } from '../../utils/types';
import FormSectionNav from '../FormSectionNav';
import styles from './styles';
import SubTopicsFormExerciseList from '../SubTopicsFormExerciseList';
import ListHandler from '../SimpleListHandler';
import { exercisesList } from '../../services/exercises';
import { Link } from 'react-router-dom';

interface Props extends FormHandlerChildrenProps<Subtopic> {
  path: string;
}

const SubTopicsForm: React.FC<Props> = ({ state, onChange, path }) => {
  const { data } = state;
  return (
    <div className={styles.container}>
      <div className={styles.inputsWrapper}>
        <InputText
          id="name"
          label="Name"
          value={data.name}
          onChange={(value) => onChange(value, 'name')}
        />
        <InputText
          id="tags"
          label="Tags"
          value={data.tags}
          onChange={(value) => onChange(value, 'tags')}
        />
        <InputTextarea
          id="description"
          label="Description"
          value={data.description}
          onChange={(value) => onChange(value, 'description')}
        />
      </div>

      <FormSectionNav options={[{ id: 'exercises', label: 'Exercises' }]} selected="exercises" />
      {data.id ? (
        <>
          <div className={styles.sectionHeader}>
            <Link to={`${path}/exercises/new`} className={styles.sectionHeaderButton}>
              Nuevo
            </Link>
          </div>
          <ListHandler list={() => exercisesList(data.id)}>
            {(props) => <SubTopicsFormExerciseList data={props.state.data} path={path} />}
          </ListHandler>
        </>
      ) : null}
    </div>
  );
};

export default SubTopicsForm;

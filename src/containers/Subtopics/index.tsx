import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import SimpleListHandler from '../../components/SimpleListHandler';
import SimpleListContainer from '../../components/SimpleListContainer';
import FormLayout from '../../components/FormLayout';
import SubTopicListItem from '../../components/SubTopicListItem';
import SubTopicsForm from '../../components/SubTopicsForm';
import ExercisesForm from '../../components/ExercisesForm';
import {
  subtopicsList,
  parseSubtopicData,
  subtopicsShow,
  subtopicsUpdate,
  subtopicsCreate,
  subtopicsDelete
} from '../../services/Subtopics';
import styles from './styles.module.css';
import {
  parseExerciseData,
  exercisesShow,
  exercisesUpdate,
  exercisesCreate,
  exercisesDelete
} from '../../services/exercises';
import { FormHandler } from '@calderaro/react-toolbox';

interface Props {
  path: string;
  push: (path: string) => void;
}

const AdminSubTopics: React.FC<Props> = ({ push, path }) => {
  const [search, setSearch] = useState('');

  return (
    <div className={styles.container}>
      <SimpleListHandler list={subtopicsList} params={{}}>
        {(ListProps) => (
          <Switch>
            <Route path={path} exact>
              <SimpleListContainer
                {...ListProps}
                onNew={() => push(path + '/new')}
                status={ListProps.state.status}
                data={ListProps.state.data}
                searchText={search}
                onChangeSearchText={(value) => setSearch(value)}
                page={1}
                pages={1}
              >
                {ListProps.state.data
                  .sort((a, b) => {
                    return a.name.localeCompare(b.name);
                  })
                  .map((item) => {
                    if (item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                      return <SubTopicListItem path={path} data={item} key={item.id} />;
                    return null;
                  })}
              </SimpleListContainer>
            </Route>
            <Route
              path={[`${path}/:subtopic/exercises/new`, `${path}/:subtopic/exercises/:exercise`]}
            >
              {({ match }) => (
                <FormHandler
                  key={match?.params.exercise}
                  id={match?.params.exercise}
                  getDefaultState={parseExerciseData}
                  load={(id) => exercisesShow(id)}
                  update={exercisesUpdate}
                  create={(data) => exercisesCreate(match?.params.subtopic, data)}
                  remove={(id) => exercisesDelete(id)}
                  onUpdateSuccess={ListProps.reload}
                  onCreateSuccess={(item) => {
                    push(`${path}/${match?.params.subtopic}/exercises/${item.id}`);
                  }}
                  onRemoveSuccess={() => {
                    push(`${path}/${match?.params.subtopic}`);
                  }}
                >
                  {(props) => (
                    <FormLayout {...props} back={() => push(`${path}/${match?.params.subtopic}`)}>
                      <ExercisesForm {...props} />
                    </FormLayout>
                  )}
                </FormHandler>
              )}
            </Route>
            <Route path={[`${path}/new`, `${path}/:id`]}>
              {({ match }) => (
                <FormHandler
                  key={match?.params.exercise}
                  id={match?.params.id}
                  getDefaultState={parseSubtopicData}
                  load={subtopicsShow}
                  update={subtopicsUpdate}
                  create={subtopicsCreate}
                  remove={subtopicsDelete}
                  onUpdateSuccess={ListProps.reload}
                  onCreateSuccess={(item) => {
                    ListProps.reload();
                    push(`${path}/${item.id}`);
                  }}
                  onRemoveSuccess={() => {
                    ListProps.reload();
                    push(path);
                  }}
                >
                  {(props) => (
                    <FormLayout {...props} back={() => push(path)}>
                      <SubTopicsForm {...props} path={match?.url || ''} />
                    </FormLayout>
                  )}
                </FormHandler>
              )}
            </Route>
          </Switch>
        )}
      </SimpleListHandler>
    </div>
  );
};

export default AdminSubTopics;

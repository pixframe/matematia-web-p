import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { FormHandler } from '@calderaro/react-toolbox';
import SimpleListHandler from '../../components/SimpleListHandler';
import SimpleListContainer from '../../components/SimpleListContainer';
import FormLayout from '../../components/FormLayout';
import TopicsForm from '../../components/TopicsForm';
import TopicsListItem from '../../components/TopicsListItem';
import ExercisesForm from '../../components/ExercisesForm';
import {
  parseTopicData,
  topicsUpdate,
  topicsList,
  topicsShow,
  topicsCreate,
  topicsDelete
} from '../../services/Topics';
import {
  parseExerciseData,
  exercisesShow,
  exercisesUpdate,
  exercisesCreate,
  exercisesDelete
} from '../../services/exercises';

interface Props {
  path: string;
  push: (path: string) => void;
}

const AdminTopics: React.FC<Props> = ({ path, push }) => {
  const [search, setSearch] = useState('');
  return (
    <div>
      <SimpleListHandler list={topicsList} params={{}}>
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
                      return (
                        <TopicsListItem key={item.id} id={item.id} path={path} name={item.name} />
                      );
                    return null;
                  })}
              </SimpleListContainer>
            </Route>
            <Route path={[`${path}/:topics/exercises/new`, `${path}/:topics/exercises/:exercise`]}>
              {({ match }) => (
                <FormHandler
                  key={match?.params.exercise}
                  id={match?.params.exercise}
                  getDefaultState={parseExerciseData}
                  load={(id) => exercisesShow(id)}
                  update={exercisesUpdate}
                  create={(data) => exercisesCreate(match?.params.topics, data)}
                  remove={(id) => exercisesDelete(id)}
                  onUpdateSuccess={ListProps.reload}
                  onCreateSuccess={(item) => {
                    push(`${path}/${match?.params.topics}/exercises/${item.id}`);
                  }}
                  onRemoveSuccess={() => {
                    push(`${path}/${match?.params.topics}`);
                  }}
                >
                  {(props) => (
                    <FormLayout {...props} back={() => push(`${path}/${match?.params.topics}`)}>
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
                  getDefaultState={parseTopicData}
                  load={topicsShow}
                  update={topicsUpdate}
                  create={topicsCreate}
                  remove={topicsDelete}
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
                      <TopicsForm {...props} path={match?.url || ''} />
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

export default AdminTopics;

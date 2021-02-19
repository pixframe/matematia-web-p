import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Layout from '../../components/LayoutWithSideBar';
import Topics from '../Topics';
import Subtopics from '../Subtopics';
import styles from './styles.module.css';

const Admin: React.FC<RouteComponentProps> = ({ history }) => (
  <Layout>
    <div className={styles.container}>
      <Switch>
        <Route path="/admin/topics">
          <Topics path="/admin/topics" push={history.push} />
        </Route>
        <Route path="/admin/subtopics">
          <Subtopics path="/admin/subtopics" push={history.push} />
        </Route>
      </Switch>
    </div>
  </Layout>
);

export default Admin;

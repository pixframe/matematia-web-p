import React from 'react';
import Layout from '../../components/Layout';
import { topicGetByCode } from '../../services/Topics';
import { profileUpdateTopic } from '../../services/profiles';
import { trainingFind } from '../../services/training';
import HomeLayout from '../../components/HomeLayout';
import InitialScreen from '../../components/InitialScreen';
import Initialization from '../Initialization';
import { Topic, Training } from '../../utils/types';
import { getNewTheme } from '../../utils/topic';
import { AuthContextComponentProps, WithAuth } from '../../utils/AuthContext';
import { Redirect } from 'react-router-dom';

interface HomeState {
  topic: Topic;
  training: Training | null;
}

class Home extends React.Component<AuthContextComponentProps, HomeState> {
  state = {
    topic: {} as Topic,
    training: null
  };

  componentDidMount() {
    if (this.props.authContext.status === 'loaded') {
      this.start();
    }
  }

  componentDidUpdate(prevProps: AuthContextComponentProps) {
    if (prevProps.authContext.status !== this.props.authContext.status) {
      this.start();
    }
  }

  start() {
    const code = this.props.authContext.userData?.currentTopicCode
      ? (this.props.authContext.userData?.currentTopicCode as number)
      : getNewTheme(this.props.authContext.userData?.topics as number[]);
    this.load(code);
  }

  async load(code: number) {
    const topic = await topicGetByCode(code);
    await profileUpdateTopic(code);
    const training = await trainingFind(topic.id);
    this.setState({
      topic,
      training
    });
  }

  render() {
    if (this.props.authContext.status === 'loading') {
      return null; // here should be a nice loader screen
    }

    if (!this.props.authContext.user) {
      return <InitialScreen />;
    }

    if (this.props.authContext.userData?.kindOfUser === '') {
      return <Initialization />;
    }

    if (!this.props.authContext.userData?.isHistoryWatch) {
      return <Redirect to="/history" />;
    }

    return (
      <Layout>
        {this.state.topic && (
          <HomeLayout
            topic={this.state.topic}
            users={['us']}
            points={[999]}
            training={this.state.training}
          />
        )}
      </Layout>
    );
  }
}

export default WithAuth(Home);

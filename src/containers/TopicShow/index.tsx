import React from 'react';
import Layout from '../../components/Layout';
import TopicPage from '../../components/TopicPage';
import { RouteComponentProps } from 'react-router-dom';
import { Topic } from '../../utils/types';
import { topicsShow } from '../../services/Topics';

interface TopicShowProps {
  id: string;
}

interface TopicShowState {
  topic: Topic | null;
}

class TopicShow extends React.Component<RouteComponentProps<TopicShowProps>, TopicShowState> {
  state = {
    topic: null
  };

  componentDidMount() {
    topicsShow(this.props.match.params.id).then((response) => {
      this.setState({
        topic: response
      });
    });
  }

  render() {
    return <Layout>{this.state.topic != null && <TopicPage topic={this.state.topic} />}</Layout>;
  }
}

export default TopicShow;

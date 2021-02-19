import React from 'react';
import { style } from 'typestyle';
import { RouteComponentProps, NavLink } from 'react-router-dom';
import Layout from '../../components/Layout';
import PostReader from '../../components/PostReader';
import { Topic } from '../../utils/types';
import { topicsShow } from '../../services/Topics';
import back from '../../assets/images/UI/back_blue_arrow.svg';
import background from '../../assets/images/background/PuntitosFondo.svg';

interface BlogProps {
  id: string;
}

interface BlogState {
  topic: Topic;
  status: 'loading' | 'loaded' | 'failed';
}

const blogStyle = style({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2% 10%',
  width: '100%',
  backgroundImage: `url(${background})`,
  backgroundPositionY: 'bottom',
  backgroundRepeat: 'no-repeat'
});

const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
});

const headerText = style({
  fontSize: '2em'
});

const backSize = style({
  width: '3em'
});

const videoDiv = style({
  margin: '2% 0%'
});

class Blog extends React.Component<RouteComponentProps<BlogProps>, BlogState> {
  state = {
    topic: {} as Topic,
    status: 'loading' as 'loading' | 'loaded' | 'failed'
  };

  componentDidMount() {
    topicsShow(this.props.match.params.id).then((response) => {
      this.setState({
        topic: response
      });
    });
  }

  render() {
    return (
      <Layout>
        {this.state.topic.id && (
          <>
            <div className={blogStyle}>
              <div className={header}>
                <NavLink to={`/topic/${this.props.match.params.id}`}>
                  <img src={back} alt="back" className={backSize} />
                </NavLink>
                <p className={headerText}>{this.state.topic.name}</p>
                <div />
              </div>
              {this.state.topic.videoID && (
                <div className={videoDiv}>
                  <iframe
                    title="video"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${this.state.topic.videoID}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <PostReader id={this.props.match.params.id} post={this.state.topic.post} />
            </div>
          </>
        )}
      </Layout>
    );
  }
}

export default Blog;

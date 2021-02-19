import React from 'react';
import { style } from 'typestyle';
import { withTranslation, WithTranslationProps } from 'react-i18next';
import { topicGetByCode } from '../../services/Topics';
import { profileUpdateTopic } from '../../services/profiles';
import Layout from '../Layout';
import getStorageURL from '../../utils/storage';
import { getPrerequisite, getRepeatThemes } from '../../utils/topic';
import { Topic } from '../../utils/types';
import PassPage from './PassPage';
import NotPassPage from './NotPassPage';
import frame from '../../assets/images/icons/result/frame.svg';
import frame_1 from '../../assets/images/icons/result/frame_1.svg';
import frame_2 from '../../assets/images/icons/result/frame_2.svg';
import { Redirect } from 'react-router-dom';

interface PlayFinishProps {
  topicId: string;
  topicCode: number;
  answers: number;
  repeted: number;
}

interface PlayFinishState {
  pass: boolean;
  selectedHelp: number;
  needTopic: Topic;
  possibleTopics: Topic[];
  selected: number;
  redirecting: boolean;
}

class PlayFinish extends React.Component<WithTranslationProps & PlayFinishProps, PlayFinishState> {
  state = {
    pass: this.props.answers >= 7,
    selectedHelp: -2,
    needTopic: {} as Topic,
    possibleTopics: [] as Topic[],
    selected: 0,
    redirecting: false
  };

  componentDidMount() {
    this.getLoaded();
  }

  pointsForAnswer = 1000;
  coinsForAnswer = 2;

  finishLoading: () => boolean = () => {
    return this.state.needTopic.id === undefined && this.state.possibleTopics.length < 3;
  };

  getLoaded = async () => {
    const { repeted, topicCode } = this.props;
    const { pass } = this.state;
    if (!pass) {
      if (repeted >= 2) {
        const codes = getRepeatThemes([], topicCode);
        const array: Topic[] = [];
        codes.forEach(async (code) => {
          const topic = await topicGetByCode(code);
          array.push(topic);
          this.setState({
            possibleTopics: [...array, topic]
          });
        });
      } else if (repeted === 1) {
        topicGetByCode(topicCode).then(async (response: Topic) => {
          this.setState({
            needTopic: response
          });
        });
        await profileUpdateTopic(topicCode);
      } else {
        const prerequisite = getPrerequisite(topicCode) as number;
        await profileUpdateTopic(prerequisite);
        topicGetByCode(getPrerequisite(topicCode) as number).then(async (response: Topic) => {
          this.setState({
            needTopic: response
          });
        });
      }
    } else {
      topicGetByCode(topicCode).then(async (response: Topic) => {
        this.setState({
          needTopic: response
        });
      });
    }
  };

  getImageUrl = (needId: string) => {
    return getStorageURL(`topics/${needId}/sceneImage.svg`);
  };

  setSelectedHelp = (value: number) => {
    this.setState({ selectedHelp: value });
  };

  imageDiv = style({
    width: '72vh',
    height: '40vh',
    backgroundSize: 'cover',
    backgroundImage: `url(${this.getImageUrl(this.props.topicId)})`
  });

  changeSelected = (amount: number) => {
    const { selected } = this.state;
    let value = 2;
    if (amount + selected < 0) {
      value = 2;
    } else if (amount + selected > 2) {
      value = 0;
    } else {
      value = amount + selected;
    }
    this.setState({ selected: value });
  };

  getCorrectImage = () => {
    switch (this.props.answers) {
      case 10:
        return frame;
      case 9:
        return frame_1;
      default:
        return frame_2;
    }
  };

  redirect = async () => {
    const { possibleTopics, selected } = this.state;
    if (this.props.repeted >= 2) {
      await profileUpdateTopic(parseInt(possibleTopics[selected].code));
    }
    this.setState({ redirecting: true });
  };

  render() {
    const { selectedHelp, needTopic, possibleTopics, selected, redirecting } = this.state;
    const { repeted, i18n, answers } = this.props;
    return (
      <Layout>
        {this.state.pass ? (
          <PassPage
            i18n={i18n}
            answers={answers}
            coinsForAnswer={this.coinsForAnswer}
            pointsForAnswer={this.pointsForAnswer}
            getCorrectImage={this.getCorrectImage}
            imageDivClass={this.imageDiv}
          />
        ) : redirecting ? (
          <Redirect to="/" />
        ) : (
          <NotPassPage
            i18n={i18n}
            repeted={repeted}
            selectedHelp={selectedHelp}
            needTopic={needTopic}
            possibleTopics={possibleTopics}
            selected={selected}
            isFinishLoading={this.finishLoading()}
            getImageUrl={this.getImageUrl}
            setSelectedHelp={this.setSelectedHelp}
            changeSelected={this.changeSelected}
            redirect={this.redirect}
          />
        )}
      </Layout>
    );
  }
}

export default withTranslation()(PlayFinish);

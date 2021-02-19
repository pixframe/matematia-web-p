import React from 'react';
import uid from 'uid';
import Layout from '../../components/Layout';
import { RouteComponentProps } from 'react-router-dom';
import { WithAuth, AuthContextComponentProps } from '../../utils/AuthContext';
import { exercisesList } from '../../services/exercises';
import {
  Exercise,
  Answer,
  Question,
  AnswerRecord,
  Training,
  ExerciseTypeNames
} from '../../utils/types';
import RatingSystem from '../../components/Interctives/RatingSystem';
import { TrueFalseInteractive } from '../../components/Interctives/TrueFalseInteractive';
import AnswerModal from '../../components/Interctives/AnswerModal';
import PlayWelcome from '../../components/PlayWelcome';
import PlayFinish from '../../components/PlayFinish';
import ExerciseTypePage from '../../components/Interctives/ExerciseTypePage';
import checkExerciseAnswers from '../../utils/isCorrect';
import { MultipleChoiceInteractive } from '../../components/Interctives/MultipleChoiceInteractive';
import ClosedAnswerInteractive from '../../components/Interctives/ClosedAnswerInteractive';
import ColumnsInteractive from '../../components/Interctives/ColumnsInteractive';
import SequenceInteractive from '../../components/Interctives/SequenceInteractive';
import ClassificationInteractive from '../../components/Interctives/ClassificationInteractive';
import MultipleQuestionsInteractive from '../../components/Interctives/MultipleQuestionsInteractive';
import DragAndDropInteractive from '../../components/Interctives/DragAndDropInteractive';
import QuestionDiv from '../../components/Interctives/Question';
import stopWatch from '../../utils/stopwatch';
import { trainingCreate, trainingUpdate, trainingFind } from '../../services/training';
import { profileUpdateValues } from '../../services/profiles';
import InteractiveHeader from '../../components/Interctives/InteractiveHeader';
import InteractiveDiv from '../../components/Interctives/InteractiveDiv';
import HelpModal from '../../components/Interctives/HelpModal';
import HintModal from '../../components/Interctives/HintModal';
import BackgroundDiv from '../../components/Interctives/BackgroundDiv';
import getStorageURL from '../../utils/storage';
import styles from './styles';

interface Params {
  id: string;
  topicId: string;
  topicCode: string;
}

type ExerciseAnswer = [Question, Answer][];

interface state {
  status: 'loading' | 'loaded' | 'failure';
  gameStatus:
    | 'initialized'
    | 'exercisePage'
    | 'playing'
    | 'result'
    | 'rating'
    | 'timeout'
    | 'finished';
  currentIndex: number;
  exercises: Exercise[];
  timer: NodeJS.Timeout | null;
  gameStartTime: number;
  gameFinishTime: number;
  error: Error | null;
  answers: ExerciseAnswer;
  training: Training;
  needHelp: boolean;
  needHint: boolean;
  numberOfHints: number;
  lives: number;
  isTrainingSave: boolean;
}

class Play extends React.Component<RouteComponentProps<Params> & AuthContextComponentProps, state> {
  stopWatch = new stopWatch();
  constructor(props: RouteComponentProps<Params> & AuthContextComponentProps) {
    super(props);
    this.state = {
      status: 'loading',
      gameStatus: 'initialized',
      currentIndex: 0,
      exercises: [],
      timer: null,
      gameStartTime: 0,
      gameFinishTime: 0,
      error: null,
      answers: [],
      training: {
        id: uid(),
        userId: '',
        topicName: this.props.match.params.topicId,
        subtopicsId: this.props.match.params.id,
        beginAt: new Date(),
        exercises: [],
        records: [],
        trainingTime: 0,
        result: 0,
        status: 'incomplete'
      },
      needHelp: false,
      needHint: false,
      numberOfHints: 0,
      lives: 3,
      isTrainingSave: false
    };
  }

  componentDidMount() {
    this.load();
  }

  load = async () => {
    try {
      this.setState({
        status: 'loading',
        error: null,
        gameStatus: 'initialized',
        currentIndex: 0,
        exercises: []
      });

      const subtopicsIds = this.props.match.params.id.split('&');

      const exercisesGroups = await Promise.all(
        subtopicsIds.map((subtopic) => exercisesList(subtopic))
      );

      const exercises = exercisesGroups.reduce((a, b) => [...a, ...b]);
      const exercisesIds = exercises.map((item) => item.id);

      const existTraining = await trainingFind(this.props.match.params.topicId);
      const currentIndex = existTraining ? existTraining.records.length : 0;
      const currentTraining = existTraining
        ? existTraining
        : { ...this.state.training, exercises: exercisesIds };
      const isTrainingSave = existTraining !== null;
      const lives = existTraining
        ? 3 - existTraining.records.filter((record) => record.result === 'wrong').length
        : 3;
      this.setState({
        status: 'loaded',
        exercises,
        training: currentTraining,
        currentIndex,
        isTrainingSave,
        lives
      });
    } catch (error) {
      console.log(error);
      this.setState({ status: 'failure', error });
    }
  };

  showExerciseType = () => {
    this.setState({
      gameStatus: 'exercisePage'
    });
    setTimeout(this.play, 3000);
  };

  play = () => {
    const { currentIndex, exercises } = this.state;
    const currentExercise = exercises[currentIndex];
    if (currentExercise.isTimeLimited) {
      const timer = setTimeout(this.timeout, currentExercise.estimatedTime);
      const now = Date.now();
      return this.setState({ gameStatus: 'playing', timer, gameStartTime: now });
    }
    this.stopWatch.startWatch();
    const now = Date.now();
    this.setState({ gameStatus: 'playing', gameStartTime: now });
  };

  finish = () => {
    // send data to server here
    const gameFinishTime = Date.now();
    return this.setState({ gameStatus: 'finished', gameFinishTime });
  };

  timeout = () => {
    this.setState({ gameStatus: 'timeout' });
  };

  answer = (exerciseAnswer: [Question, Answer][]) => {
    const { currentIndex, exercises, training, lives } = this.state;
    this.stopWatch.pauseWatch();

    const exercise = exercises[currentIndex];
    const isCorrect = checkExerciseAnswers(exercise.type, exerciseAnswer);

    const answerInfo: AnswerRecord = {
      answer: exerciseAnswer[0][1].text,
      exerciseType: exercise.type,
      exerciseId: exercise.id,
      answerFinishTime: this.stopWatch.getSeconds(),
      result: isCorrect ? 'correct' : 'wrong',
      needHint: false,
      skills: [...exercise.skills]
    };

    const currentRecords = [...this.state.training.records, answerInfo];

    const rightAnswers = currentRecords.filter((record) => record.result === 'correct').length;
    const result = (rightAnswers / this.state.exercises.length) * 100;
    const trainingTime = this.state.training.trainingTime + this.stopWatch.getSeconds();

    const newTraining: Training = {
      ...training,
      records: currentRecords,
      result,
      trainingTime
    };

    this.stopWatch.resetWatch();

    const newLives = isCorrect ? lives : lives - 1;
    if (newLives < 0 || currentIndex + 1 >= exercises.length) {
      this.updateProfileValues(newTraining, newLives);
    } else {
      this.saveSession(newTraining);
    }
    this.setState({ lives: newLives, gameStatus: 'result', answers: exerciseAnswer });
  };

  updateProfileValues = async (training: Training, lives: number) => {
    const newTraining: Training = { ...training, status: 'complete' };
    let visuospaciality = 0;
    let temporalSpace = 0;
    let workingMemory = 0;
    let mentalAgility = 0;
    let planing = 0;
    let mathematicalThinking = 0;
    let semanticMemory = 0;
    let proceduralMemory = 0;
    let reasoning = 0;

    training.records.forEach((record) => {
      const value = record.result === 'correct' ? 1 : -1;
      record.skills.forEach((skill) => {
        switch (skill) {
          case 'visuospatiality':
            visuospaciality += value;
            break;
          case 'temporalSpace':
            temporalSpace += value;
            break;
          case 'workingMemory':
            workingMemory += value;
            break;
          case 'mentalAgility':
            mentalAgility += value;
            break;
          case 'planning':
            planing += value;
            break;
          case 'mathematicalThinking':
            mathematicalThinking += value;
            break;
          case 'semanticMemory':
            semanticMemory += value;
            break;
          case 'proceduralMemory':
            proceduralMemory += value;
            break;
          case 'reasoning':
            reasoning += value;
            break;
        }
      });
    });
    await this.saveSession(newTraining);
    await profileUpdateValues(
      visuospaciality,
      temporalSpace,
      workingMemory,
      mentalAgility,
      planing,
      mathematicalThinking,
      semanticMemory,
      proceduralMemory,
      reasoning,
      lives >= 0,
      parseInt(this.props.match.params.topicCode)
    );
  };

  componentWillUnmount() {
    if (this.state.timer) {
      clearTimeout(this.state.timer);
    }
    this.stopWatch.destroy();
  }

  saveSession = async (training: Training) => {
    const { isTrainingSave } = this.state;
    if (!isTrainingSave) {
      const id = await trainingCreate(training);
      const newTraining = { ...training, id };
      this.setState({
        training: newTraining,
        isTrainingSave: true
      });
    } else {
      await trainingUpdate(training);
      this.setState({
        training: training
      });
    }
  };

  sendRating = async (rate: number) => {
    this.setState({ gameStatus: 'finished' });
  };

  continue = async () => {
    const { lives, currentIndex, exercises } = this.state;
    this.setState({ currentIndex: currentIndex + 1 });
    if (lives >= 0 && currentIndex + 1 < exercises.length) {
      this.stopWatch.startWatch();
      this.showExerciseType();
    } else {
      this.setState({
        gameStatus: 'rating'
      });
    }
  };

  showHelp = (value: boolean) => {
    this.setState({
      needHelp: value
    });
  };

  showHint = () => {
    const numberOfHints = this.state.numberOfHints + 1;
    this.setState({
      needHint: true,
      numberOfHints
    });
  };

  hideHint = () => {
    this.setState({
      needHint: false
    });
  };

  isMoreThanOneQuestion = (kind: ExerciseTypeNames) => {
    return (
      kind === 'classification' ||
      kind === 'columns' ||
      kind === 'multipleQuestions' ||
      kind === 'draganddrop'
    );
  };

  render() {
    const {
      status,
      gameStatus,
      currentIndex,
      exercises,
      error,
      answers,
      needHint,
      lives
    } = this.state;

    if (status === 'loading') {
      return (
        <Layout>
          <div>Loading</div>
        </Layout>
      ); // TODO: better loading indicator component
    }

    if (status === 'failure') {
      return (
        <Layout>
          <div>Error: {error?.message}</div>
        </Layout>
      );
      // TODO: better error indicator component
    }

    if (!exercises.length) {
      return (
        <Layout>
          <div>Empty SubTopic</div>
        </Layout>
      );
      // TODO: better empty subtopic error handling component
    }

    if (gameStatus === 'initialized') {
      return <PlayWelcome onContinue={this.showExerciseType} />;
    }

    if (gameStatus === 'finished') {
      return (
        <PlayFinish
          topicId={this.props.match.params.topicId}
          answers={
            this.state.training.records.filter((record) => record.result === 'correct').length
          }
          topicCode={parseInt(this.props.match.params.topicCode)}
          repeted={
            this.props.authContext.userData?.failedTopics.filter(
              (failedTopic) => failedTopic === parseInt(this.props.match.params.topicCode)
            ).length as number
          }
        />
      );
    }

    if (gameStatus === 'rating') {
      return (
        <Layout>
          <BackgroundDiv>
            <RatingSystem onSend={this.sendRating} />
          </BackgroundDiv>
        </Layout>
      ); // TODO: better empty subtopic error handling
    }

    const currentExercise = exercises[currentIndex];

    if (gameStatus === 'result') {
      return (
        <Layout>
          <BackgroundDiv>
            <AnswerModal answers={answers} exercise={currentExercise} onContinue={this.continue} />
          </BackgroundDiv>
        </Layout>
      );
    }

    if (gameStatus === 'exercisePage') {
      return (
        <Layout>
          <BackgroundDiv>
            <InteractiveHeader
              isPlayTime={false}
              numOfQuestions={exercises.length}
              currentQuestion={currentIndex + 1}
              currentLives={lives}
            />
            <ExerciseTypePage typeOfExercise={currentExercise.type} />
          </BackgroundDiv>
        </Layout>
      );
    }

    if (needHint) {
      return (
        <Layout>
          <BackgroundDiv>
            <HintModal onUnderstand={this.hideHint} help={currentExercise.help.text} />
          </BackgroundDiv>
        </Layout>
      );
    }

    return (
      <Layout>
        <BackgroundDiv>
          <InteractiveHeader
            onHintPressed={this.showHint}
            onHelpPressed={() => this.showHelp(true)}
            isPlayTime={true}
            numOfQuestions={exercises.length}
            currentQuestion={currentIndex + 1}
            currentLives={lives}
          />
          <InteractiveDiv>
            <QuestionDiv
              question={
                this.isMoreThanOneQuestion(currentExercise.type)
                  ? currentExercise.text
                  : currentExercise.questions[0].text
              }
            />
            {currentExercise.image && (
              <img
                className={styles.imgStyle}
                src={getStorageURL(currentExercise.image as string)}
                alt={currentExercise.questions[0].text}
              />
            )}
            {currentExercise.type === 'trueFalse' ? (
              <TrueFalseInteractive data={currentExercise.questions} onAnswer={this.answer} />
            ) : null}
            {currentExercise.type === 'multipleChoice' ? (
              <MultipleChoiceInteractive data={currentExercise.questions} onAnswer={this.answer} />
            ) : null}

            {currentExercise.type === 'closedAnswer' ? (
              <ClosedAnswerInteractive data={currentExercise.questions} onAnswer={this.answer} />
            ) : null}

            {currentExercise.type === 'columns' ? (
              <ColumnsInteractive data={currentExercise.questions} onAnswer={this.answer} />
            ) : null}
            {currentExercise.type === 'sequence' ? (
              <SequenceInteractive data={currentExercise.questions} onAnswer={this.answer} />
            ) : null}
            {currentExercise.type === 'classification' ? (
              <ClassificationInteractive data={currentExercise.questions} onAnswer={this.answer} />
            ) : null}
            {currentExercise.type === 'multipleQuestions' ? (
              <MultipleQuestionsInteractive
                data={currentExercise.questions}
                onAnswer={this.answer}
              />
            ) : null}
            {currentExercise.type === 'draganddrop' ? (
              <DragAndDropInteractive data={currentExercise.questions} onAnswer={this.answer} />
            ) : null}
          </InteractiveDiv>
        </BackgroundDiv>
        <HelpModal
          help="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt semper nulla, sed molestie lectus malesuada non. Duis aliquet mi at molestie tincidunt. Curabitur et arcu id mauris feugiat tincidunt vel id massa. Nulla feugiat a justo at iaculis. Nam eleifend, leo id euismod consectetur, odio neque suscipit nibh, eget suscipit eros eros non quam. Morbi sed lacus eget dolor pretium sodales. Donec euismod, velit nec pretium consequat, augue massa fringilla risus, nec feugiat velit diam sit amet quam. Sed molestie vestibulum scelerisque."
          isOpen={this.state.needHelp}
          close={() => this.showHelp(false)}
        />
      </Layout>
    );
  }
}

export default WithAuth(Play);

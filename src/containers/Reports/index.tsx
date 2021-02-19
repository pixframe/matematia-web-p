import React from 'react';
import { Training, Profile } from '../../utils/types';
import { profileShowOwn } from '../../services/profiles';
import { listOfTrainings } from '../../utils/reports';
import Layout from '../../components/Layout';
import AuthHOC from '../../components/AuthHoc';
import ReportLayout from '../../components/ReportLayout';
import SpecificReport from '../../components/SpecificReport';

interface ReportsProps {
  info?: string;
}

interface ReportsState {
  reports: Training[];
  profile: Profile;
  currentPage: number;
  amountOfPages: number;
  currentIndex: number | null;
  isLoading: boolean;
}

class Reports extends React.Component<ReportsProps, ReportsState> {
  constructor(props: ReportsProps) {
    super(props);
    this.state = {
      reports: [],
      profile: {
        id: '',
        username: '@capulinita#57sdf4',
        firstName: 'Capulina',
        lastName: 'Perez',
        grade: '',
        institution: '',
        entity: '',
        score: 0,
        topics: [],
        exercises: 0,
        visuospaciality: 0,
        temporalSpace: 0,
        workingMemory: 0,
        mentalAgility: 0,
        planing: 0,
        mathematicalThinking: 0,
        semanticMemory: 0,
        proceduralMemory: 0,
        reasoning: 0,
        kindOfUser: '',
        avatar: '',
        sex: '',
        birthDate: undefined,
        isHistoryWatch: false,
        currentTopicCode: null,
        failedTopics: []
      },
      isLoading: true,
      amountOfPages: 0,
      currentPage: 0,
      currentIndex: null
    };
  }

  sizeOfPages = 5;

  componentDidMount() {
    this.load();
  }

  async load() {
    const profile = await profileShowOwn();
    const reports = await listOfTrainings();
    const amountOfPages = Math.ceil(reports.length / 5);
    this.setState({
      profile,
      reports,
      amountOfPages,
      isLoading: false
    });
  }

  changePage(value: number) {
    const newPage = this.state.currentPage + value;
    this.setState({
      currentPage: newPage
    });
  }

  changeIndexReport(value: number) {
    this.setState({
      currentIndex: value
    });
  }

  clearIndex() {
    this.setState({
      currentIndex: null
    });
  }

  render() {
    return (
      <Layout>
        {this.state.isLoading ? (
          <div>cargando</div>
        ) : this.state.currentIndex === null ? (
          <ReportLayout
            points={100}
            weekPoints={20}
            aproved={1}
            totalQuestions={10}
            page={this.state.currentPage}
            numOfPages={this.state.amountOfPages}
            sizeOfPage={this.sizeOfPages}
            reports={[
              ...this.state.reports.slice(
                this.sizeOfPages * this.state.currentPage,
                this.sizeOfPages * this.state.currentPage + this.sizeOfPages
              )
            ]}
            name={`${this.state.profile.firstName} ${this.state.profile.lastName}`}
            userName={this.state.profile.username}
            institute={this.state.profile.institution}
            nextPage={() => this.changePage(1)}
            previosPage={() => this.changePage(-1)}
            selectedIndex={(value) => this.changeIndexReport(value)}
          />
        ) : (
          <SpecificReport
            training={this.state.reports[this.state.currentIndex]}
            clearIndex={() => this.clearIndex()}
          />
        )}
      </Layout>
    );
  }
}

export default AuthHOC(Reports);
